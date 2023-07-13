const joinBtn = document.getElementById("search_zipcode");
const joinSubmitBtn = document.getElementsByClassName("btn_join")[0];
const joinModal = document.getElementById("register_success");

// 값 가져오기
const joinNameInput = document.getElementById("name");
const joinEmailInput = document.getElementById("email");
const joinPasswordInput = document.getElementById("pw");
const joinPasswordConfirmInput = document.getElementById("pw_confirm");
const joinPhoneInput1 = document.getElementById("phone1");
const joinPhoneInput2 = document.getElementById("phone2");
const joinPhoneInput3 = document.getElementById("phone3");
const joinZipcodeInput = document.getElementById("zipcode");
const joinAddrInput1 = document.getElementById("addr1");
const joinAddrInput2 = document.getElementById("addr2");

// 주소 검색 api
joinBtn.addEventListener("click", () => {
    new daum.Postcode({
        oncomplete: function (data) {
            let addr = ""; // 주소 변수
            let extraAddr = ""; // 참고항목 변수

            if (data.userSelectedType === "R") {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            if (data.userSelectedType === "R") {
                if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }

                if (data.buildingName !== "" && data.apartment === "Y") {
                    extraAddr +=
                        extraAddr !== ""
                            ? ", " + data.buildingName
                            : data.buildingName;
                }

                if (extraAddr !== "") {
                    extraAddr = " (" + extraAddr + ")";
                }
            } else {
                joinAddrInput2.value = "";
            }

            joinZipcodeInput.value = data.zonecode;
            joinAddrInput1.value = addr;
            joinAddrInput2.focus();
        },
    }).open();
});

joinSubmitBtn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    // 입력값
    const fullName = joinNameInput.value;
    const email = joinEmailInput.value;
    const password = joinPasswordInput.value;
    const joinUserPwConfirm = joinPasswordConfirmInput.value;
    const joinUserPhone1 = joinPhoneInput1.value;
    const joinUserPhone2 = joinPhoneInput2.value;
    const joinUserPhone3 = joinPhoneInput3.value;
    const phoneNumber = joinUserPhone1 + joinUserPhone2 + joinUserPhone3;
    const postalCode = joinZipcodeInput.value;
    const address1 = joinAddrInput1.value;
    const address2 = joinAddrInput2.value;

    // 유효성 검사
    if (fullName == "") {
        alert("❗️이름을 입력해 주세요.");
        joinNameInput.focus();
    } else if (!email.includes("@")) {
        alert("❗️올바른 이메일 형태가 아닙니다.");
        joinEmailInput.focus();
    } else if (password == "") {
        alert("❗️비밀번호를 입력해주세요.");
        joinPasswordInput.focus();
    } else if (password.length < 6) {
        alert("❗️6자 이상 입력해주세요.");
        joinPasswordInput.focus();
    } else if (joinUserPhone1 == "") {
        alert("❗️전화번호를 입력해주세요.");
        joinPhoneInput1.focus();
    } else if (joinUserPhone2 == "") {
        alert("❗️전화번호를 입력해주세요.");
        joinPhoneInput2.focus();
    } else if (joinUserPhone3 == "") {
        alert("❗️전화번호를 입력해주세요.");
        joinPhoneInput3.focus();
    } else if (address1 == "" || address2 == "") {
        alert("❗️주소를 입력해주세요.");
    }

    // 비밀번호 비교
    if (password !== joinUserPwConfirm) {
        alert("❗️비밀번호가 일치하지 않습니다.");
        joinPasswordConfirmInput.focus();
    }

    // 객체
    const userInfoData = {
        fullName: fullName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: {
            postalCode: postalCode,
            address1: address1,
            address2: address2,
        },
    };

    const dataJson = JSON.stringify(userInfoData);

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: dataJson,
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        if (res.status == 201) {
            joinModal.style.display = "flex"; // 회원가입 완료 모달창 띄우기
            document.getElementsByClassName("welcome_user_name")[0].innerText += `${fullName}님 `;
        } else {
            alert("회원가입 실패");
        }
    });
}