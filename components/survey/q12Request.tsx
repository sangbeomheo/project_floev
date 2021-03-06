import React, { useState } from 'react'
import { availablePurchaseRequestTime } from '../../utils/surveyUtils'
import { getDayDate, getOnlyDate, getWeekday } from '../../utils/timeFormat'
import { LOUNGE } from '../../lib/constants'
import { EVENT } from '../../lib/hatchery/constants'

const fromToday = getDayDate(7, 0)
const now = new Date(Date.now());

export default function Q12Request(props: SurveyProps) {
  const [loungeCode, setLoungeCode] = useState<number>(props.oldAnswers.loungeCode)
  const [requestDate, setRequestDate] = useState<string>(props.oldAnswers.requestDate)
  const [requestTime, setRequestTime] = useState<string>(props.oldAnswers.requestTime)

  function handleChangeDate(e: any) {
    const newRequestDate = fromToday[e.currentTarget.id].date
    setRequestDate(newRequestDate)
    setLoungeCode(0)
    setRequestTime('')

    let answersParam: Answers = props.oldAnswers
    answersParam.requestDate = newRequestDate
    answersParam.loungeCode = 0
    answersParam.requestTime = ''
    props.answersUpdate(answersParam)

    localStorage.setItem('floev[currentStep]', '12')
    localStorage.setItem('floev[requestDate]', newRequestDate)
    localStorage.removeItem('floev[loungeCode]')
    localStorage.removeItem('floev[requestTime]')
  }

  function handleChangeLoungeTime(e: any) {
    const newRequestTime = e.target.value.split(',')[0]
    const newLoungeCode = parseInt(e.target.value.split(',')[1])
    setRequestTime(newRequestTime)
    setLoungeCode(newLoungeCode)

    let answersParam: Answers = props.oldAnswers
    answersParam.requestTime = newRequestTime
    answersParam.loungeCode = newLoungeCode
    props.answersUpdate(answersParam)

    localStorage.setItem('floev[currentStep]', '13')
    localStorage.setItem('floev[requestTime]', newRequestTime)
    localStorage.setItem('floev[loungeCode]', String(newLoungeCode))
  }

  function naverPixelRequest() {
    let _nasa = {
      cnv: ''
    };
    if (window.wcs) {
      _nasa["cnv"] = window.wcs.cnv("4", "1");
      window.wcs.inflow("floev.com");
      window.wcs_do(_nasa);
    }
  }
  function handleClickNext() {
    naverPixelRequest()
    props.onNext(EVENT.SURVEY.Q12.NEXT)
  }

  const availableYeuksamTimes = availablePurchaseRequestTime(requestDate, LOUNGE.YEUKSAM, props.purchaseRequest)
  const availableGangNumTimes = availablePurchaseRequestTime(requestDate, LOUNGE.GANGNAM, props.purchaseRequest)

  return (<>
    <div className="q-wrap q12">
      <div className="q-wrap__question-main">???????????? ????????? ??????????????????.</div>
      <div className="q-wrap__question-sub">????????? ????????? ?????? 7??? ???????????? ?????? ???????????????.</div>
      <div className="q-wrap__answer-wrap q12__schedule">
        <div className="q12__day-date">
          <div className="q12__day-date-title">?????? ??????</div>
          <div className="q12__title-underline"></div>
          <ul className="q12__day-date-option-list">
            {fromToday.map(
              (item: any, index: number) => (
                <li className={getOnlyDate(item.date) === String(now.getDate()) ? "q12__day-date-option today" : "q12__day-date-option"} key={index} id={index.toString()} value={getOnlyDate(item.date)} onClick={e => handleChangeDate(e)}>
                  <p className={getOnlyDate(item.date) == String(now.getDate()) ? "day today" : "day"}>
                    {getOnlyDate(item.date) == String(now.getDate()) ? '??????' : item.day}
                  </p>
                  <button className={item.date == requestDate ? "date selected" : "date"}>
                    {getOnlyDate(item.date)}
                  </button>
                </li>)
            )}
          </ul>
        </div>
        <div className="q12__coupon-area">
          <div className="q12__coupon">
            <div><strong>?????? ?????? ????????????<br /><span>2?????? ?????? ??????</span> ?????? ?????????!</strong></div>
            <img src="/img/survey/coupon-welcome-banner.png" alt="" />
          </div>
        </div>
        <div className="q12__lounge-time">
          <div className="q12__lounge-time-title">?????????/?????? ??????</div>
          <div className="q12__title-underline"></div>
          <div className="q12__option-lounge">
            <div></div>
            <div className="lounge-name">????????? ????????????</div>
            <div className="lounge-caption">????????? 1????????? ??????7???, ????????????</div>
            <ul className="option-list">
              {requestDate !== '' && !(getWeekday(requestDate) === '?????????' || getWeekday(requestDate) === '?????????') &&
                availableYeuksamTimes.map(
                  (item: Slot, index: number) => (
                    // ?????? ???????????? 4?????? ???????????? ?????? ???????????? 3??? ???????????? ?????? ?????????
                    (getOnlyDate(requestDate) === String(now.getDate()) &&
                      (parseInt(item.time.slice(0, 2)) < (now.getHours() + 4) ||
                        now.getHours() >= 15) ? '' :
                      (<li key={index} id={index.toString()} onClick={(e) => handleChangeLoungeTime(e)}>
                        <button className={item.time === requestTime && item.loungeCode === loungeCode ? "time selected" : "time"} value={item.time + ',' + item.loungeCode}>{item.time}</button>
                      </li>))
                  )
                )}
            </ul>
          </div>
          <div className="q12__option-lounge">
            <div></div>
            <div className="lounge-name">????????? ??????</div>
            <div className="lounge-caption">????????? 4????????? ??????3???, ????????????</div>
            <ul className="option-list">
              {requestDate !== '' && availableGangNumTimes.map(
                (item: Slot, index: number) => (
                  // ?????? ???????????? 4?????? ???????????? ?????? ???????????? 3??? ???????????? ?????? ?????????
                  (getOnlyDate(requestDate) === String(now.getDate()) &&
                    (parseInt(item.time.slice(0, 2)) < (now.getHours() + 4) ||
                      now.getHours() >= 15) ? '' :
                    (<li key={index} id={index.toString()} onClick={(e) => handleChangeLoungeTime(e)}>
                      <button className={item.time === requestTime && item.loungeCode === loungeCode ? "time selected" : "time"} value={item.time + ',' + item.loungeCode} >{item.time}</button>
                    </li>))
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="q-wrap__btn-wrap">
        <button className="q-wrap__btn q-wrap__btn-prev tn-0025" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev(EVENT.SURVEY.Q12.PREV)}>??????</button>
        {requestDate === "" || loungeCode === 0 || requestTime === "" ? (
          <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>??????</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
          (<button className="q-wrap__btn q-wrap__btn-next tn-0024" type="button" onClick={handleClickNext}><span>??????</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
        }
      </div>
    </div>
  </>)
}