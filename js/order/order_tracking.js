// 현재 로그인 되어 있는 계정 토큰 불러오기
const USERTOKEN = localStorage.getItem('userToken');

//주문 추가
const orderTrackingList = document.querySelector('.order_tracking_list');
const orderList = document.querySelector('.order_list');

// 배송지 정보
const receiverNameInfo = document.getElementsByClassName('receiver_name')[0];
const receiverNumInfo = document.getElementsByClassName('receiver_num')[0];
const receiverZipInfo = document.getElementsByClassName('receiver_zipcode')[0];
const receiverAddrInfo1 = document.getElementsByClassName('receiver_addr1')[0];
const receiverAddrInfo2 = document.getElementsByClassName('receiver_addr2')[0];

// 주문 정보
const orderedIdInfo = document.getElementsByClassName('ordered_num')[0];
const orderedDateInfo = document.getElementsByClassName('ordered_date')[0];
const orderedListInfo = document.getElementsByClassName('ordered_list')[0];
const orderedCountInfo = document.getElementsByClassName('ordered_count')[0];
const orderedSumInfo = document.getElementsByClassName('ordered_sum')[0];

fetch('http://kdt-sw-5-team01.elicecoding.com/api/orderslist', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${USERTOKEN}`,
    },
})
    .then((res) => res.json())
    .then((loginUserdata) => {
        // 주문 동적 추가 함수
        for (let i = 0; i < loginUserdata.length; i++) {
            if (loginUserdata.length === 0) {
                orderTrackingList.innerHTML += '주문정보가 없습니다';
            } else {
                orderTrackingList.innerHTML += `
                    <div class="order_list">
                        <div class="order_name">
                            <ul class="list_name">
                                <li class="order_id">주문 번호 : ${
                                    loginUserdata[i]._id
                                }</li>
                                <li>결제금액 : ${loginUserdata[
                                    i
                                ].totalPrice.toLocaleString('ko-KR')}원</li>
                            </ul>
                        </div>
                        <div class="order_btn">
                            <ul>
                                <li class="user_order_status">${
                                    loginUserdata[i].status
                                }</li>
                                <li class="order_del">주문삭제</li>
                            </ul>
                        </div>
                    </div>
            `;
            }
        }

        // 주문정보 상세 조회
        const orderDetailInfoModal =
            document.getElementsByClassName('user_order_modal')[0];

        // 모달창 닫기
        const orderModalBtn = document.getElementsByClassName(
            'btn_close_order_modal',
        )[0];

        orderModalBtn.addEventListener('click', () => {
            orderDetailInfoModal.style.display = 'none';
        });

        const orderNumId = document.querySelectorAll('.order_id');
        orderNumId.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                orderDetailInfoModal.style.display = 'flex';
                fetch(
                    `http://kdt-sw-5-team01.elicecoding.com/api/orderslist/${loginUserdata[i]._id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${USERTOKEN}`,
                        },
                    },
                )
                    .then((res) => res.json())
                    .then((receiverInfo) => {
                        receiverNameInfo.innerText = receiverInfo.receiver;
                        receiverNumInfo.innerText = receiverInfo.phoneNumber;
                        receiverZipInfo.innerText =
                            receiverInfo.address.postalCode;
                        receiverAddrInfo1.innerText =
                            receiverInfo.address.address1;
                        receiverAddrInfo2.innerText =
                            receiverInfo.address.address2;
                        orderedIdInfo.innerText = loginUserdata[i]._id;
                    });
            });
        });

        // 주문 취소
        const orderDeleteBtn = document.querySelectorAll('.order_del');

        orderDeleteBtn.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (loginUserdata[i].status == '주문완료') {
                    let isRemove = confirm('주문을 취소하시겠습니까?');
                    fetch(
                        `http://kdt-sw-5-team01.elicecoding.com/api/orderslist/${loginUserdata[i]._id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${USERTOKEN}`,
                            },
                        },
                    )
                        .then((res) => res.json())
                        .then((res) => {
                            if (isRemove) {
                                location.reload();
                            }
                        });
                } else {
                    alert('관리자 승인이 필요합니다!');
                }
            });
        });

        orderNumId.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                fetch(
                    `http://kdt-sw-5-team01.elicecoding.com/api/ordersitemlist/${loginUserdata[i]._id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${USERTOKEN}`,
                        },
                    },
                )
                    .then((res) => res.json())
                    .then((orderItem) => {
                        let totalCount = 0;
                        for (let i = 0; i < orderItem.length; i++) {
                            totalCount += orderItem[i].quantity;
                            orderedDateInfo.innerText = orderItem[
                                i
                            ].createdAt.slice(0, 10);
                            orderedDateInfo.innerText = orderItem[
                                i
                            ].createdAt.slice(0, 10);
                            if (totalCount == 1) {
                                orderedListInfo.innerText =
                                    orderItem[i].productName;
                            } else {
                                orderedListInfo.innerText = `${
                                    orderItem[i].productName
                                } 외 ${totalCount - 1}개`;
                            }
                            orderedCountInfo.innerText = `${totalCount}개`;
                            orderedSumInfo.innerText = `${orderItem[
                                i
                            ].finalPrice.toLocaleString('ko-KR')}원`;
                        }

                        // 주문 상품 목록 조회
                        const viewAllItems =
                            document.getElementsByClassName(
                                'list_all_items',
                            )[0];
                        const modalAllItems =
                            document.getElementsByClassName('modal_items')[0];
                        const allItemsList =
                            document.getElementsByClassName('items_list')[0];
                        const modalItemsCloseBtn =
                            document.getElementsByClassName(
                                'btn_close_items_modal',
                            )[0];

                        viewAllItems.addEventListener('click', () => {
                            modalAllItems.style.display = 'flex';
                            allItemsList.innerHTML = '';

                            for (let j = 0; j < orderItem.length; j++) {
                                allItemsList.innerHTML += `
                                <ul>
                                    <li class="item_name"> 
                                        <span>상품명</span>
                                        <p>${orderItem[j].productName}</p>
                                    </li>
                                    <li class="item_info">
                                        <div class="item_quantity">
                                            <span>수량</span>
                                            <p>${orderItem[j].quantity}개</p>
                                        </div>
                                        <div class="item_price"> 
                                            <span>가격</span>
                                            <p>${orderItem[
                                                j
                                            ].finalPrice.toLocaleString(
                                                'ko-KR',
                                            )}원</p>
                                        </div>
                                    </li>
                                </ul>
                            `;
                            }
                        });

                        modalItemsCloseBtn.addEventListener('click', () => {
                            modalAllItems.style.display = 'none';
                        });
                    });
            });
        });
    });

// 로그아웃
const sideLogoutBtn1 = document.getElementsByClassName('side_logout_btn')[0];
sideLogoutBtn1.addEventListener('click', () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('cartItems');
    location.href = '/html/login.html';
});
