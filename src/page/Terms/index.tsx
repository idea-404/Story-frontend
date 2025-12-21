import { Arrow } from "@/assets";
import { useTermsStore } from "@/Store/terms";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const { setIsAgreed } = useTermsStore();
  const navigate = useNavigate();

  const handleAgree = () => {
    setIsAgreed(true);
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="flex justify-start w-[37.5rem] my-[1.5rem]"
        onClick={() => navigate(-1)}
      >
        <Arrow />
      </button>
      <div className="prose w-[37.5rem] h-[26rem] overflow-y-scroll overflow-x-hidden mb-[2.91rem]">
        <h1>이용약관</h1>

        <h2>제1조 (목적)</h2>

        <p>
          본 약관은 팀 404(이하 “운영자”)가 제공하는 <strong>story</strong>{" "}
          서비스의 이용과 관련하여
        </p>

        <p>
          운영자와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>

        <hr />

        <h2>제2조 (서비스 소개)</h2>

        <p>
          story는 포트폴리오 및 블로그를 작성하고 공유할 수 있는 서비스입니다.
        </p>

        <p>
          회원은 글 작성, 댓글, 좋아요, 이미지 업로드 및 포트폴리오 피드백 AI
          기능을 이용할 수 있습니다.
        </p>

        <p>
          비회원은 메인페이지 및 검색페이지에서 게시물을 조회할 수 있습니다.
        </p>

        <hr />

        <h2>제3조 (회원 가입)</h2>

        <ol>
          <li>본 서비스는 회원 가입 후 이용할 수 있습니다.</li>
          <li>
            회원 가입은 이메일 인증 또는 Google, Kakao 소셜 로그인을 통해
            이루어집니다.
          </li>
          <li>
            회원은 정확한 정보를 제공해야 하며, 허위 정보 입력 시 서비스 이용이
            제한될 수 있습니다.
          </li>
        </ol>

        <hr />

        <h2>제4조 (회원 탈퇴)</h2>

        <ol>
          <li>회원은 언제든지 회원 탈퇴를 요청할 수 있습니다.</li>
          <li>회원 탈퇴 시 개인정보는 지체 없이 삭제됩니다.</li>
          <li>
            다만, 서비스 운영 또는 관련 법령에 따라 일부 정보는 일정 기간 보관될
            수 있습니다.
          </li>
        </ol>

        <hr />

        <h2>제5조 (서비스 이용 제한)</h2>

        <p>다음과 같은 행위를 할 경우 서비스 이용이 제한될 수 있습니다.</p>

        <ul>
          <li>불법적인 콘텐츠 게시</li>
          <li>타인의 권리(저작권, 개인정보 등)를 침해하는 행위</li>
          <li>음란하거나 혐오 표현이 포함된 콘텐츠 게시</li>
          <li>서비스 운영을 방해하는 행위</li>
        </ul>

        <hr />

        <h2>제6조 (콘텐츠의 저작권)</h2>

        <ol>
          <li>회원이 작성한 콘텐츠의 저작권은 작성자 본인에게 있습니다.</li>
          <li>
            운영자는 서비스 제공 및 운영을 위해 해당 콘텐츠를 서비스 내에서
            노출하거나 활용할 수 있습니다.
          </li>
        </ol>

        <hr />

        <h2>제7조 (AI 피드백 서비스)</h2>

        <ol>
          <li>
            포트폴리오 피드백 AI는 회원이 입력한 내용을 분석하여 피드백을
            제공합니다.
          </li>
          <li>
            입력된 내용은 피드백 제공을 위한 용도로만 사용되며, AI 모델 학습에는
            사용되지 않습니다.
          </li>
        </ol>

        <hr />

        <h2>제8조 (책임의 제한)</h2>

        <p>
          운영자는 무료로 제공되는 서비스 이용과 관련하여 발생한 손해에 대해
          법령에 특별한 규정이 없는 한 책임을 지지 않습니다.
        </p>

        <hr />

        <h2>제9조 (문의)</h2>

        <p>서비스 이용과 관련한 문의는 아래 이메일로 연락할 수 있습니다.</p>

        <p>📧 s25030@gsm.hs.kr</p>

        <hr />

        <h1>📄 개인정보 수집·이용 동의서</h1>

        <h2>1. 개인정보 수집 항목</h2>

        <h3>필수 항목</h3>

        <ul>
          <li>이메일 주소</li>
        </ul>

        <h3>선택 항목</h3>

        <ul>
          <li>닉네임</li>
          <li>프로필 이미지</li>
          <li>학번</li>
          <li>전공</li>
          <li>소개글</li>
        </ul>

        <p>※ 자동으로 수집되는 개인정보(IP, 쿠키, 로그 등)는 없습니다.</p>

        <hr />

        <h2>2. 개인정보 수집 및 이용 목적</h2>

        <ul>
          <li>회원 식별 및 인증</li>
          <li>서비스 제공 및 운영</li>
          <li>포트폴리오 및 블로그 기능 제공</li>
          <li>AI 피드백 서비스 제공</li>
        </ul>

        <hr />

        <h2>3. 개인정보 보유 및 이용 기간</h2>

        <ul>
          <li>회원 탈퇴 시까지 보관</li>
          <li>단, 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관</li>
        </ul>

        <hr />

        <h2>4. 개인정보의 제3자 제공</h2>

        <ul>
          <li>개인정보를 제3자에게 제공하지 않습니다.</li>
        </ul>

        <hr />

        <h2>5. 개인정보 처리 위탁</h2>

        <p>
          원활한 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁할 수
          있습니다.
        </p>

        <ul>
          <li>Google, Kakao: 소셜 로그인 서비스</li>
          <li>외부 클라우드 서비스: 이미지 저장</li>
          <li>이메일 발송 서비스: 회원 인증 메일 발송</li>
        </ul>

        <hr />

        <h2>6. 동의 거부 권리 및 불이익</h2>

        <p>이용자는 개인정보 수집·이용에 대한 동의를 거부할 수 있습니다.</p>

        <p>
          다만, 필수 항목에 대한 동의를 거부할 경우 회원 가입 및 서비스 이용이
          제한될 수 있습니다.
        </p>
      </div>
      <button
        onClick={handleAgree}
        className={
          "w-[32.5rem] bg-primary-main1 text-white rounded-[0.625rem] h-[3rem] font-bold text-[1.25rem]"
        }
      >
        이용 약관 동의
      </button>
    </div>
  );
};

export default Terms;
