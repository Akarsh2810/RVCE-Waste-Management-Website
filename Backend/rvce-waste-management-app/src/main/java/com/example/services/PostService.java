package com.example.services;

import java.util.*;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.numbers.complex.Complex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.models.Post;
import com.example.models.User;
import com.example.repositories.PostRepository;
import com.example.repositories.UserRepository;

@Service
public class PostService {
	
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserRepository userRepository;
	
	public Post createPost(Post post) {
		return postRepository.save(post);
	}
	
	public List<Post> getAllPosts() {
		return postRepository.findAll();
	}
	
	public List<Post> getAllPostsByUserMailId(String userMailId) {
		List<User> users = userRepository.findByUserMailId(userMailId);
		User user = users.get(0);
		String fullName = user.getFullName();
		return postRepository.findByFullName(fullName);
	}
	
	public void deletePostByPostId(String id) throws Exception {
		postRepository.deleteById(id);
	}


	public List<String> calculate(Map<String, Object> calc) {
		Object YBusDataReal = calc.get("YBusDataReal");
		Object YBusDataImag = calc.get("YBusDataImag");
		Object BusData = calc.get("BusData");
		List<String> res = new ArrayList<>();
		ObjectMapper objectMapper = new ObjectMapper();//java objects to json


		List<List<String>> YBusDataRealArray = objectMapper.convertValue(YBusDataReal, new TypeReference<List<List<String>>>() {});
		List<List<String>> YBusDataImagArray = objectMapper.convertValue(YBusDataImag, new TypeReference<List<List<String>>>() {});
		List<List<String>> BusDataArray = objectMapper.convertValue(BusData, new TypeReference<List<List<String>>>() {});

		List<List<Double>> busdata = new ArrayList<>();
		BusDataArray.forEach(dataBus->{
			List<Double> d = new ArrayList<>();
			dataBus.forEach(data->{
				d.add(Double.parseDouble(data));
			});
			busdata.add(d);
		});

		Complex[][] YBus = new Complex[YBusDataRealArray.size()][YBusDataRealArray.get(0).size()];
		List<List<Double>> busdataReal = new ArrayList<>();
		YBusDataRealArray.forEach(dataBus->{
			List<Double> d = new ArrayList<>();
			dataBus.forEach(data->{
				d.add(Double.parseDouble(data));
			});
			busdataReal.add(d);
		});
		List<List<Double>> busdataImag = new ArrayList<>();
		YBusDataImagArray.forEach(dataBus->{
			List<Double> d = new ArrayList<>();
			dataBus.forEach(data->{
				d.add(Double.parseDouble(data));
			});
			busdataImag.add(d);
		});
		for (int i = 0; i < YBusDataRealArray.size(); i++) {
			for (int j = 0; j < YBusDataRealArray.get(0).size(); j++) {
				YBus[i][j] = Complex.ofCartesian(busdataReal.get(i).get(j), busdataImag.get(i).get(j));
			}
		}

		double[] bus = new double[busdata.size()];
		double[] type = new double[busdata.size()];
		Complex[] V = new Complex[busdata.size()];
		double[] th = new double[busdata.size()];
		double[] GMW = new double[busdata.size()];
		double[] GMVAR = new double[busdata.size()];
		double[] LMW = new double[busdata.size()];
		double[] LMVAR = new double[busdata.size()];
		double[] Qmin = new double[busdata.size()];
		double[] Qmax = new double[busdata.size()];
		for (int i = 0; i < busdata.size(); i++) {
			List<Double> row = busdata.get(i);
			bus[i] = row.get(0);
			type[i] = row.get(1);
			V[i] = Complex.ofCartesian(row.get(2), 0);
			th[i] = row.get(3);
			GMW[i] = row.get(4);
			GMVAR[i] = row.get(5);
			LMW[i] = row.get(6);
			LMVAR[i] = row.get(7);
			Qmin[i] = row.get(8);
			Qmax[i] = row.get(9);
		}
		double nbus = Arrays.stream(bus).max().orElse(Double.NEGATIVE_INFINITY);
		double[] P = new double[busdata.size()];
		for(int i = 0;i < busdata.size();i++) P[i] = GMW[i] - LMW[i];
		double[] Q = new double[busdata.size()];
		for(int i = 0;i < busdata.size();i++) Q[i] = GMVAR[i] - LMVAR[i];
		Complex[] Vprev = V.clone();
		double toler = 1;
		int k = 1;

		while(toler > 0.001) {
			for(int p = 1;p < nbus;p++) {
				Complex sumyv = Complex.ofCartesian(0, 0);
				for(int q = 0;q < nbus;q++) {
					if(p != q) {
						sumyv = sumyv.add(YBus[p][q].multiply(V[q]));
					}
				}
				if(type[p] == 2) {
					Q[p] = -(V[p].conj().multiply((sumyv.add(YBus[p][p].multiply(V[p]))))).getImaginary();
					if(Q[p] > Qmax[p] || Q[p] < Qmin[p]) {
						if(Q[p] < Qmin[p]) {
							Q[p] = Qmin[p];
						}
						else {
							Q[p] = Qmax[p];
						}
						type[p] = 3;
					}
				}
				V[p] = (Complex.ONE.divide(YBus[p][p])).multiply((Complex.ofCartesian(P[p], 0).subtract(Complex.ofCartesian(0, Q[p]))).divide(V[p].conj()).subtract(sumyv));
				if(type[p] == 2) {
					V[p] = Complex.ofCartesian( Math.cos(V[p].arg()) * (Vprev[p].abs()), Math.sin(V[p].arg()) * (Vprev[p].abs()) );
				}
				System.out.printf("\n The voltages at all buses and Q at PV buses after iteration no %d", k);
				String s1 = "\n The voltages at all buses and Q at PV buses after iteration no " + k;
				res.add(s1);
				if(type[p] == 3) {
					System.out.printf("\n V(%d)=%.4f at %.2fdeg\n", p + 1, V[p].abs(), Math.toDegrees(V[p].arg()));
					String s2 = String.format("V(%d)=%.4f at %.2fdeg", p + 1, V[p].abs(), Math.toDegrees(V[p].arg()));
					res.add(s2);
				}
				else {
					System.out.printf("\n V(%d)=%.4f at %.2fdeg , Q(%d)= %+.3f\n" , p + 1, V[p].abs() , Math.toDegrees(V[p].arg()), p + 1, Q[p]);
					String s3 = String.format("V(%d)=%.4f at %.2fdeg , Q(%d)= %+.3f", p + 1, V[p].abs() , Math.toDegrees(V[p].arg()), p + 1, Q[p]);
					res.add(s3);
				}
			}
			k = k + 1;
			double diff = V[0].abs() - Vprev[0].abs();
			for(int i = 1;i < V.length;i++)
				diff = Math.max(Math.abs(V[i].abs() - Vprev[i].abs()), diff);
			toler = diff;
			System.arraycopy(V, 0, Vprev, 0, V.length);
		}

		return res;

	}


}

