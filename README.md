# Guessing Movie for quick-draw  
![캡처](/image/HomePage.PNG)
영화의 키워드를 그림으로 표현하고, 표현한 그림의 키워드를 예측하는 모델을 적용하여 쌍방향적 언어 학습이 가능한 캐주얼 게임 형태의 웹페이지 제작을 목표로 한다.   
Google 에서 제공하는 낙서 데이터 셋 기반의 Convolutional Neural Network (CNN) 모델을 학습 하고, 사용자가 그린 그림을 분석하여 카테고리 예측과 분류가 가능한 모델을 구축한다.  
모델이 분류한 카테고리와 데이터베이스에 저장된 TMDb 기반 영화 데이터 셋의 키워드를 비교하는 알고리즘을 적용하고, 약 14만 개 영화 중 관련도 높은 영화를 예측하여 제시한다. 
## Description  
  
#### 개발목표  

*  영화 키워드를 그림으로 표현하고, 키워드 예측 모델을 적용한 캐주얼 게임 형태의 웹페이지 제작  
  
#### 수행과정  
* 사용자는 캔버스에 영화 키워드 그림을 그림  
* 캔버스 그림의 카테고리를 예측
* 여러 카테고리를 영화 키워드와 비교하여 관련 영화 예측  

  
#### 필요사항  
* 영화에 대한 키워드 데이터: [Firebase Realtime Database](https://asap-tensor-default-rtdb.firebaseio.com/)
* 그림의 카테고리 예측 모델: [Google Cloud Storage](guessing_movie_345)


## Project Setup
#### npm setup
```
npm install              //Node.js로 만들어진 모듈을 웹에서 받아서 설치하고 관리해주는 프로그램
```
```
npm vue                  //JavaScript 기반의 웹 프레임워크 사용을 지원하는 모듈
``` 
```
npm vue-router           //Props를 통한 데이터 전달과 안정적인 페이지 이동을 지원하는 모듈
```
```
npm @tensorflow/tfjs     //Tensorflow를 javascript 환경에서 사용할 수 있도록 하는 모듈
```
```
npm firebase             //Google firebase를 javascript 환경에서 사용할 수 있도록 하는 모듈
```
#### Download CORS plugin
```
https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
```

### Run
```
npm run serve
```

## Model Construction 
![캡처](/image/ach1.png)
![캡처](/image/ach2.png)