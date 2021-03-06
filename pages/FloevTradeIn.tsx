import React from 'react'
import Layout from '../layout/DefaultLayout'

const FloevTradeIn = () => {

  return (
    <Layout title="플로브 반납보상">
      <div className="page__outer">
        <div className="page__inner">
          <div className="container">
            {/* container__tradein */}
            <div className="container__tradein">
              {/* section__1 */}
              <div className="section section__1">
                <div className="img__1"><img src="/img/test8/tradein/1.jpg" alt="" /></div>
              </div>

              {/* section__2 */}
              <div className="section section__2">
                <p className="p__1"><strong>플로브 반납보상</strong></p>
                <p className="p__2"><strong>안경 반납하고 <br />크레딧 돌려받으세요.</strong></p>
                <p className="p__3">플로브에서 구매한 안경을 반납하면 새 안경 구매 시 사용할 수 있는 크레딧으로 구매금액에 최대 25%를 돌려받을 수 있어요. 또 주변 지인에게 크레딧을 양도할 수도 있어요. </p>
              </div>

              {/* section__3 */}
              <div className="section section__3"><div className="img__2"><img src="/img/test8/tradein/2.jpg" alt="" /></div></div>

              {/* section__4 */}
              <div className="section section__4">
                <p className="p__1"><strong>원하는 만큼 착용한 안경,<br />반납하고 구매금액의<br />25%까지 보상받아요.</strong></p>
                <p className="p__2">플로브에서 구매한 안경을 반납하면 사용 기간과 테의 상태에 따라 크레딧으로 최대 25%까지 보상해드려요.</p>
              </div>

              {/* section__5 */}
              <div className="section section__5">
                <div className="div__1">
                  <span className="span__1">사용기간</span>
                  <span className="span__1">예상 크레딧</span>
                  {/*<span className="span__1">예상 현금</span>*/}
                </div>
                <div className="div__2">
                  <span className="span__2 lh-48">~ 6개월 미만</span>
                  <span className="span__2 lh-48">최대 25%</span>
                  {/*<span className="span__2 lh-48 big">최대 30%</span>*/}
                </div>
                <div className="line"></div>
                <div className="div__2">
                  <span className="span__2">6개월 이상<br />~ 12개월 미만</span>
                  <span className="span__2 lh-48">최대 20%</span>
                  {/*<span className="span__2 lh-48">최대 20%</span>*/}
                </div>
                <div className="line"></div>
                <div className="div__2">
                  <span className="span__2">12개월 이상<br />~ 18개월 미만</span>
                  <span className="span__2 lh-48">최대 15%</span>
                  {/*<span className="span__2 lh-48">최대 10%</span>*/}
                </div>
              </div>

              {/* section__6 */}
              <div className="section section__6">
                <div className="div__1">구매할 때</div>
                <div className="item">
                  <div className="img__3"><img src="/img/test8/item__3.jpg" alt="" /></div>
                  <p className="p__1"><strong>아이씨 베를린</strong></p>
                  <p className="p__2">OROSHI BK</p>
                  <div className="line"></div>
                  <p className="p__3">68 <span className="won">만원</span></p>
                  <p style={{fontSize:'13px',color:'#666'}}>*구매금액은 고객별로 다를 수 있습니다.</p>
                </div>
                <div className="img__4"><img src="img/test8/tradein/arrow.png" alt="" /></div>
                <div className="card-wrap">
                  {/*<div className="card__or">OR</div>*/}
                  <div className="card card__1">
                    <div className="div__2">6개월 이내 반납시</div>
                    <span className="span__1">크레딧</span>
                    <span className="span__4" style={{color: '#d24816'}}>만원</span>
                    <span className="span__3" style={{color: '#d24816'}}>17.0</span>
                    <span className="span__2">25%</span>
                  </div>
                  <div className="card card__1">
                    <div className="div__2">6~12개월 사이 반납시</div>
                    <span className="span__1">크레딧</span>
                    <span className="span__4" style={{color: '#d24816'}}>만원</span>
                    <span className="span__3" style={{color: '#d24816'}}>13.6</span>
                    <span className="span__2">20%</span>
                  </div>
                  <div className="card card__1">
                    <div className="div__2">12~18개월 사이 반납시</div>
                    <span className="span__1">크레딧</span>
                    <span className="span__4" style={{color: '#d24816'}}>만원</span>
                    <span className="span__3" style={{color: '#d24816'}}>10.2</span>
                    <span className="span__2">15%</span>
                  </div>
                </div>
                {/*<div className="div__3">크레딧 또는 현금으로<br />보상을 선택해보세요!</div>*/}
              </div>

              {/* section__7 */}
              <div className="section section__7" style={{paddingBottom:'52px'}}>
                <div className="div__1">
                  <p><strong>플로브 반납보상 서비스와<br />슬기로운 안경생활</strong></p>
                </div>
                <div className="div__2">
                  <div className="num"><strong>1</strong></div>
                  <p className="p__1"><strong>매번 여분 안경테가 늘어나<br />처치 곤란하신가요?</strong></p>
                  <p className="p__2">일상생활은 1~2개의 여분 안경으로도 충분해요. 앞으로는 다양한 반납 보상 혜택으로 안경을 구매해보세요.</p>
                </div>
                <div className="div__2">
                  <div className="num"><strong>2</strong></div>
                  <p className="p__1"><strong>눈 건강을 위해<br />12~18개월의 안경 주기를 추천해요.</strong></p>
                  <p className="p__2">안경 렌즈는 햇빛, 열, 스크레치의 원인으로  손상되요. 고급 렌즈보단 나에게 잘 맞는 렌즈를 자주 교체하는 게 좋아요. 플로브 반납 보상 서비스로 안경 교체의 부담을 줄여드릴게요.</p>
                </div>
                <div className="div__2 last">
                  <div className="num"><strong>3</strong></div>
                  <p className="p__1"><strong>부담없이 돌려받으세요.</strong></p>
                  <p className="p__2">고객에게 좋고, 플로브도 반납받은 안경테를 다양한 방식으로 활용해요. 플로브 자체 공정을 거치는 리퍼비쉬 제품 또는 플로브 크루 교육에 사용될 예정이에요.</p>
                </div>
              </div>

              {/* btn-more-wrap */}


              <div className="btn-more-wrap" style={{position:'fixed', bottom:'0', background:'none', padding:'0 0 0 0',width:'100%',maxWidth:'414px'}}>
                <div className="btn-more">
                  <a href="https://floevcontact.typeform.com/to/aS597QFV" target="_blank" className="tn-0058" style={{display:'block',color:'white',fontSize:'17px',lineHeight:'54px',width:'100%',height:'52px',background:'#d24816',borderRadius:'0'}}>반납보상 신청하기</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>

  )
}

export default FloevTradeIn
