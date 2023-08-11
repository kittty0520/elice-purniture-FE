# JavaScript-Project-Elice Furniture

CRUD 기반 가구 쇼핑몰

## 🖥️ 프로젝트 소개

필요한 상품을 빠르고 편리하게 구매가능한 CURD 기반 가구 쇼핑몰 입니다.

<a href="https://www.miricanvas.com/v/128re4x">발표 자료</a>

## 🕰️ 개발 기간

-   23.07.03일 - 23.07.14일

### 🧑‍🤝‍🧑 맴버구성

-   팀장 : 박민준 <a href="https://github.com/mj9457">[프론트엔드]</a> - 메인, 카테고리(필터링, 관리자CURD), 상품목록(필터링, 관리자(CRUD)), 상품 상세페이지, 주문조회
-   팀원1 : 김다솔 <a href="https://github.com/da22sol">[프론트엔드]</a> - 상품 상세페이지, 주문하기
-   팀원2 : 임유선 <a href="https://github.com/dllys/">[프론트엔드]</a> - 로그인, 회원가입, 주문하기, 주문조회, 회원관리(관리자), 주문관리(관리자), 상품등록 이미지추가(관리자) 검색, 디자인(기본 프레임)
-   팀원3 : 소화경 <a href="https://github.com/sohwakyeong">[백엔드]</a> - 상품 (CURD), 카테고리 (CRUD)
-   팀원4 : 이지영 <a href="https://github.com/devluna0505">[백엔드]</a> - 로그인 (JWT Token), 구글 로그인, 유저 (CURD), 검색, 상품 (CURD), 상품 이미지 추가, 카테고리 (CURD)
-   팀원5 : 최태관 <a href="https://github.com/Rinainverses">[백엔드]</a> - 주문조회 (사용자 & 관리자), 주문취소 (사용자 & 관리자), 결제(Naver Pay)

### ⚙️ 개발 환경

-   `HTML`
-   `CSS`
-   `JavaScript`
-   `Node.js`
-   `Express.js`
-   **Database** : MongoDB
-   **DESIGN** : Figma

## 📌 주요 기능

### 1. 메인 페이지 - <a href="" >상세보기 - WIKI 이동</a>

-   상품 배너 이미지 슬라이드(Swiper.js)
-   인기 상품 랜덤 생성

### 2. 상품 페이지 - <a href="" >상세보기 - WIKI 이동</a>

-   카테고리별 상품 분류
-   필터(신상품, 높은 가격, 낮은 가격순) 정렬 기능

### 3. 상품 상세 페이지 - <a href="" >상세보기 - WIKI 이동</a>

-   상품 정보 안내
-   장바구니에 담거나 주문하려는 상품 개수 증감
-   장바구니에 담거나 주문할 시 localStorage에 상품정보 및 개수 추가

### 4. 장바구니 페이지 - <a href="" >상세보기 - WIKI 이동</a>

-   장바구니에 담은 상품 구매
-   장바구니에 담은 상품 선택 구매
-   장바구니에 담은 상품 선택 삭제
-   장바구니에 담은 상품 증감

### 5. 주문하기 페이지 - <a href="" >상세보기 - WIKI 이동</a>

-   userToken에 저장된 사용자 정보 가져오기
-   배송지 정보 수정 시 주문내역에 반영
-   상품 구매(일반 구매, Naver Pay 구매)

### 6. 로그인 - <a href="" >상세보기 - WIKI 이동</a>

-   DB값 검증
-   로그인 시 JWT토큰(JSON Web Token)을 발급
-   클라이언트에서 로컬스토리지에 저장

### 7. 회원가입 - <a href="" >상세보기 - WIKI 이동</a>

-   주소 API 연동
-   EMAIL(ID) 중복 체크

### 8. 검색 페이지 - <a href="" >상세보기 - WIKI 이동</a>

-   검색 키워드를 상품의 이름과 shortDescription에서 탐색(mongoose - query사용)

### 9. 마이 페이지 - <a href="" >상세보기 - WIKI 이동</a>

-   유저 정보 수정
-   회원 탈퇴

### 9-1. 주문조회 페이지 - <a href="" >상세보기 - WIKI 이동</a>

-   유저가 구매한 주문내역 (주문한 상품 정보와 배송지 정보) 확인

### 10. 관리자 페이지 - <a href="" >상세보기 - WIKI 이동</a>

-   상품 정보 관리
-   주문 정보 관리
-   카테고리 관리
-   회원 정보 관리

## 🎆트러블 슈팅

### 프론트엔드

-   모든 레이아웃 작업이 끝난 뒤에도 방향성을 잡지 못해 기능 개발의 목록만 보며 방황하며 개발 진행 무뎌짐
    <br>
    `코치님께 조언을 얻어 구현해야 하는 기능을 리스트로 정리한 후 우선순위를 부여`
-   <a href="https://kdt-gitlab.elice.io/sw_track/class_05/web_project/team01/front-end/-/issues/2">관리자 카테고리 기능에서 fetch 오류</a>
    <br>
    `data가 undefined 인데 split 시도해서 발생한 오류로 "data || undefined" 를 사용하여 해결`

### 백엔드

-   DB에 저장된 유저의 정보를 받아올 때, 보안에 민감한 정보가 같이 전달되어 정보노출의 위험성 존재
    <br>
    `DB에서 원하는 데이터를 가져오기 위해, 보안에 민감한 정보를 제외한 특정한 값만 return 하도록 수정`

## 🛠️ 리팩토링

### 로그인

-   로그인 방식을 passport.js를 사용하도록 수정, 구글 로그인 추가

### 회원가입

-   이메일 중복확인 추가

### 상품 이미지 추가

-   multer.js를 이용해 상품 이미지를 서버에 저장, 전체 상품 정보를 DB에 생성할 때 이미지 경로를 저장

### 주문하기

-   Naver Pay 결제 기능 추가

### 장바구니

-   단일 상품 선택 주문 및 삭제 추가

### 주문조회

-   주문 취소 가능, 주문 상품 상세 조회 가능

### 검색

-   상품 이름, 키워드로 상품 검색

### 반응형 페이지

-   사용자의 모든 페이지를 반응형(1440px, 1024px, 768px, 424px) (관리자는 예외)

### 성능 최적화

-   이미지를 로딩할 때 Lazy Loading 사용
-   가격, 액수(, 컴마) 사용
