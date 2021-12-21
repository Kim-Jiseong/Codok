import React from "react";
import { useHistory ,useLocation } from "react-router-dom";
import axios from "axios";
import { useRecoilState , useRecoilValue } from "recoil";
import { profileState } from "../../../atoms/atoms";
import * as S from "../style";

function Write() {
  const history = useHistory();
  const location = useLocation();
  const profile = useRecoilValue(profileState);
  const clickedLecture = location.state.clickedLecture;
  console.log(clickedLecture)
    const goBack = () => {
        history.goBack();
    };
    const write = async (writeInfo) => {
        axios({
          method: "post",
          url: `http://localhost:8000/api/posts`,
        //   ${profilePk},
          data: writeInfo,
          withCredentials: true,
        })
        .then((res) => history.push({pathname:'/board',state: {clickedLecture: clickedLecture}}));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const writeInfo = { 
            title: e.target.title.value, 
            content: e.target.content.value,
            courseId: clickedLecture.courseId, 
            lecturePk: clickedLecture.pk,
            authorPk: profile.pk,
         };
        return write(writeInfo);
      };

    const introduce = {
        background: '#F8FAFD',
        border: '0.5px solid rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        borderRadius: '5px',
        width: '100%',
        resize: 'None',
        height: '300px',
        fontFamily: "Spoqa Hans Sans Neo",
    }
    return(
        <>
        <S.Container>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <S.Circle onClick={goBack}>
                    <i className="fas fa-arrow-left"></i>
                </S.Circle>
                <S.SubTitle>글 작성</S.SubTitle>
                <div style={{width: '44px', height: '44px'}}></div>
            </div>
            <form onSubmit={onSubmit}>
                <S.InputWrapper><S.InputID type="text" required id="title" name="title" placeholder="제목을 적어주세요"/></S.InputWrapper>
                <textarea required placeholder="수업을 듣는 친구들과 익명으로 소통하세요" required style={introduce} type="text" id="content" name="content"></textarea>
                
                <S.YB/>
                <S.ButtonWrapper><S.Button type="submit">업로드</S.Button></S.ButtonWrapper>

            </form>


        </S.Container>
        </>
    )

}
export default Write;