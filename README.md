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
* 정확도: 89.55%  
<img src="/image/ach1.PNG" width="80%" height="80%">
  
## Project Setup
```
Windows PowerShell 실행 
```
```
cd [Project directory]
```
```
npm install              //Node.js로 만들어진 모듈을 웹에서 받아서 설치하고 관리해주는 프로그램
```
```
npm run serve
```
```
http://localhost:8080/ 접속
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
#### Home 페이지
* 사용자가 가장 먼저 확인할 수 있는 시작 화면
* 원 형태로 회전하며 마우스 호버 시 상세 정보 확인 가능
* Start Game 버튼을 눌러 게임 시작
![캡처](/image/home.PNG)  
  
#### Board 페이지
* 사용자가 그림을 그리는 영역
* 캔버스 도구 영역 
    * 지우기(erase): 캔버스의 모든 영역을 지움 
    * 되돌리기(undo), 다시 실행(redo): 짧은 선 단위로 수행
    * 다운로드(download): 파일로 그림 저장
    * 예측(predict): 그림의 키워드 예측
![캡처](/image/board1.PNG)  
  
* 사용자가 그린 그림에 대한 이미지 예측과 키워드 저장 화면
    * 그림을 그린 후 예측 버튼을 누르면 캔버스의 왼편에 예측 키워드 상위 5개의 리스트가 나타남
    * 사용자는 리스트에서 자신이 원하는 키워드를 클릭하여 이를 추가 
    * '[x]' 버튼을 통해 삭제 가능
![캡처](/image/board2.png)  
  
* 키워드가 추가되면 캔버스 아래에 Guess movie 버튼이 나타남
    *  사용자는 예측하기를 원하는 영화에 대한 자신의 키워드를 2개 이상 5개 이하로 추가
    * Guess movie 버튼을 눌러 결과 화면(Result)으로 넘어감
![캡처](/image/board3.PNG)  
  

#### Result 페이지
* 결과화면
    * 사용자가 입력한 키워드와 예측 결과 영화를 보여줌 (4x4 형태로 출력) 
    * 가장 관련도 높은 영화를 좌측 상단에 크게 보여줌
    * ‘↺ Go home’ 영역 클릭 시 시작 화면(Home)으로 돌아감 
![캡처](/image/result1.PNG)
