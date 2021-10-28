const query = document.getElementById('search')
const submitBtn = document.getElementById('submit')
const BASE_URL = 'http://localhost:5000/api/words'
//자동완성 코딩 시작
const ul = document.querySelector(".pop_rel_keywords");
//const searchInput = document.querySelector(".serch")
const relContainer = document.querySelector(".rel_search")
let cache ='';
const checkInput = () =>{
    const beforInput = query.value;
    timer(beforInput);
}
const timer = (beforInput) =>{
    setTimeout(()=>{
        if(query.value == beforInput){
            console.log("입력멈춤");
            loadData(query.value);
            checkInput();
        }else{
            console.log("입력변함");
            checkInput();
        }
        if(query.value==""){
            relContainer.classList.add("hide");
        }else{
            relContainer.classList.remove("hide");
        }
    },200);
}

function loadData(baseUrl, query){   

    if(cache === baseUrl)return;
    else{
        cache = baseUrl;
        fetch(baseUrl)
        .then(res=> res.json())
        .then(res=> fillSearch(res.suggestions))
    }
}

const fillSearch = (suggesArr) => {
    ul.innerHTML = "";
    suggesArr.forEach((el, idx)=>{
        const li = document.createElement("li");
        li.innerHTML = el.value;
        ul.appendChild(li);
    })

    const liList = document.querySelectorAll(".pop_rel_keywords li");
}

const highlighText = () =>{

}
checkInput();
// 끝
        function checkIfStringHasSpecialCharacter(str) {
            const re = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;// /정규표현식/
            return re.test(str);
        }
        //검색어에 숫자가 들어갈 경우 검색 X
        function checkIfStringHasNumbers(str) {
            return /\d/.test(str);
        }
        //영어 문자가 들어온 경우 검색 X (보류)
        // function checkifStringHasLetters(str){
        //     return /[a-z]/i.test(str) // i는 대문자 포함
        // }

        //버튼 비활성화
        function enaleSubmitBtn(state){
            submitBtn.disabled = status
        }
        // 서버 데이터 가져오기
        function getData(baseUrl, query){
            
            //버튼 비활성화 (클릭 안되도록)
            enaleSubmitBtn(true) //비활성화
            console.log('서버 접속중...')
            //사용자 입력 유효성 검증
            if(checkIfStringHasSpecialCharacter(query)){
                enaleSubmitBtn(false) //활성화
                container.innerHTML = "Your search keyowrd has special character. Retype only hangel!"
                return;
            }
            if(checkIfStringHasNumbers(query)){
                enaleSubmitBtn(false) //활성화
                container.innerHTML = "Your search keyowrd has Numbers. Retype only hangel!"
                return;
            }
            // if(checkifStringHasLetters(query)){ //(보류)
            //     container.innerHTML = "영어 싫음 ! 한글 입력 "
            //     return;
            // }
            //console.log("special charcter")
            fetch(`${baseUrl}/${query}`, {
                headers: {
                    "Conene-Type": "application/json",
                }
            })
            .then( res => res.json() )
            .then( data =>{
                //버튼 활성화
                enaleSubmitBtn(false)
                console.log(data)
                const {words} = data;
                // 데이터 유효성 검증
                if(words.length === 0 ){
                    container.innerHTML = "No words Found !"
                    return;
                }                
                const template = words.map(word => {
                    if(word.r_seq == undefined){
                        word.r_seq =""
                    }
                    return(
                        `
                            <div class="item">
                                <div class="word"><a href="${word.r_link}"target="_blank">${word.r_word}</a><sup>${word.r_seq}</sup>${word.r_chi}</div>
                                <p class="description">${word.r_pos}<br>${word.r_des}</div>
                            </div>
                        `
                    )
                })
                container.innerHTML = template.join("")//DOM에 Templeate 삽입
            })
            
        }
        submitBtn.addEventListener('click', function(){
            console.log(query.value)            
            
            setTimeout(getData(BASE_URL, query.value))
        })
        query.addEventListener('keypress',function(e){
            if(e.keyCode === 13){
                getData(BASE_URL, query.value)
            }
        })
        window.addEventListener('DOMContentLoaded', function(){
            getData(BASE_URL)
        });