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
    * [The Movies Dataset](https://www.kaggle.com/rounakbanik/the-movies-dataset)  
    * [TMDB 5000 Movie Dataset](https://www.kaggle.com/tmdb/tmdb-movie-metadata)
* 그림의 카테고리 예측 모델: [Google Cloud Storage](guessing_movie_345)
    * [Google Quick, Draw!](https://github.com/googlecreativelab/quickdraw-dataset#readme)   

## Model 
#### Environment
* 금오공과대학교 AI ∙ 빅데이터 센터 제공 Jupyterhub  
* 서버 사양: 4 CPU, 1 GPU(GRID V100DX-16C), 16GB Memory  
* Tensorflow v2.3.0, python 3.6.13 이 설치된 환경 
  
#### Construction 
* 입력
    * 28x28 낙서 이미지 데이터 
* 특징 추출 계층
    * 4쌍의 Convolution2D layer & Max Pooling layer
* Flatten Layer
    * 2차원 행렬 → 1차원 배열
* 분류 계층(Fully Connected layer)
    * 카테고리 수(345)에 비해 부족한 클래스별 학습 이미지 수(6,000) 문제 → Batch Normalization & Dense layer 사이 2번의 Dropout(0.2, 0.5) 적용
* 
<img src="/image/ach1.PNG" width="80%" height="80%">
  
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

## Play


