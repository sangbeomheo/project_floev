import React, { useState } from 'react'
import { EVENT } from '../../lib/hatchery/constants'

export default function Q6Purpose(props: SurveyProps) {
  const [purposes, setPurposes] = useState<Array<string>>(props.oldAnswers.purposes)
  const [purposeEtc, setPurposeEtc] = useState<string>(props.oldAnswers.purposeEtc)

  function handleChangePurpose(e: any) {
    const newPurpose = e.target.value
    let newPurposes: string[] = [...purposes]

    if (e.target.checked) {
      newPurposes.push(newPurpose)
    } else {
      newPurposes = newPurposes.filter(purpose => purpose !== newPurpose)
    }
    setPurposes(newPurposes)

    let answersParam: Answers = props.oldAnswers
    answersParam.purposes = newPurposes
    props.answersUpdate(answersParam)

    localStorage.setItem('floev[currentStep]', '6')
    localStorage.setItem('floev[purposes]', newPurposes.toString())
  }

  function handleChangePuposeEtc(e: any) {
    const newPurposeEtc = e.target.value
    setPurposeEtc(newPurposeEtc)

    let answersParam: Answers = props.oldAnswers
    answersParam.purposeEtc = newPurposeEtc
    props.answersUpdate(answersParam)

    localStorage.setItem('floev[currentStep]', '6')
    localStorage.setItem('floev[purposeEtc]', newPurposeEtc)
  }

  return (<>
    <div className="q-wrap q6">
      <div className="q-wrap__question-main">어떤 용도의 안경을 추천해드릴까요?</div>
      <div className="q-wrap__answer-wrap q-wrap__checkbox-wrap" onChange={e => handleChangePurpose(e)}>
        <input className="q-wrap__input-checkbox" type="checkbox" id="q6_1" onChange={() => { }} value="daily" checked={purposes.includes("daily")} />
        <label className="q-wrap__label-checkbox" htmlFor="q6_1">일상/데일리용</label>
        <input className="q-wrap__input-checkbox" type="checkbox" id="q6_2" onChange={() => { }} value="work" checked={purposes.includes("work")} />
        <label className="q-wrap__label-checkbox" htmlFor="q6_2">업무/컴퓨터 작업용</label>
        <input className="q-wrap__input-checkbox" type="checkbox" id="q6_3" onChange={() => { }} value="home" checked={purposes.includes("home")} />
        <label className="q-wrap__label-checkbox" htmlFor="q6_3">집에서 렌즈 대신 편하게 착용</label>
      </div>
      <div className="q-wrap__textarea-wrap">
        <p className="q-wrap__textarea-caption">* 그 외 용도나 구체적인 상황을 더 들려주세요. </p>
        <textarea
          className="q-wrap__textarea"
          value={purposeEtc ?? ''}
          onChange={e => handleChangePuposeEtc(e)}
          placeholder="예시)&#13;&#10; 독서용 안경이 필요해요.&#13;&#10; 집에서만 렌즈 대신 착용하는 안경이에요."
        ></textarea>
      </div>
      <div className="q-wrap__btn-wrap">
        <button className="q-wrap__btn q-wrap__btn-prev tn-0013" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev(EVENT.SURVEY.Q6.PREV)}>이전</button>
        {(purposes.length === 0 && purposeEtc.length === 0) ? (
          <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>) :
          (<button className="q-wrap__btn q-wrap__btn-next tn-0012" type="button" onClick={() => props.onNext(EVENT.SURVEY.Q6.NEXT)}><span>다음</span> <img src="/img/survey/ic-arrows-right.png" alt="" /></button>)
        }
      </div>
    </div>
  </>)
}