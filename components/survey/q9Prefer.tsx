import React, { useState } from 'react'
import { Modal, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils/surveyUtils'

export default function Q9Prefer(props: {
    oldAnswers: Answers
    answersUpdate: (answersParam: Answers) => void
    currentStep: number
    max: number
    schedule: Schedule[]
    onPrev: () => void
    onNext: () => void
}) {
    const [prefer, setPrefer] = useState<string>(props.oldAnswers.prefer)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [preferFileList, setPreferFileList] = useState<UploadFile[]>(props.oldAnswers.preferFileList)

    async function handlePreview(file: any) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    function handleChangePreferPhoto(e: UploadChangeParam<UploadFile<any>>) {
        setPreferFileList(e.fileList)
        let answersParam: Answers = props.oldAnswers
        answersParam.preferFileList = e.fileList
        props.answersUpdate(answersParam)

    }
    function handleCancel() {
        setPreviewVisible(false)
    };

    function handleChangePrefer(e: any) {
        const newPrefer: string = e.target.value
        setPrefer(newPrefer)

        let answersParam: Answers = props.oldAnswers
        answersParam.prefer = newPrefer
        props.answersUpdate(answersParam)

        // for caching
        localStorage.setItem('floev[currentStep]', '9')
        localStorage.setItem('floev[preger]', newPrefer)
    }

    return (<>
        <div className="q-wrap q9">
            <div className="q-wrap__question-main">안경에 대한 고민, 플로브에게 요청하고 싶은 내용을 남겨주세요.</div>
            <div className="q-wrap__question-sub">선호하는 브랜드, 스타일, 색상 또는 기피하는 색상. 원하는 분위기, 착용감 등을 자유롭게 남겨주세요. 이미지를 보내주셔도 좋아요.</div>
            <div className="q-wrap__answer-wrap">
                <textarea className="q-wrap__textarea"
                    placeholder='예시)&#13;무채색 안경을 선호하지만 검정색은 별로에요&#13;뿔테는 무거워서 싫고 금속테 위주로 보고싶어요.&#13;&#13;첫 안경이라 어떤게 어울리는지 잘 모르겠어요. 최대한 다양하게 경험해볼래요!&#13;&#13;회사에서 존재감 있는 사람이 되고싶은데 안경으로 이미지 변신을 하고싶어요!'
                    value={prefer} onChange={(e) => handleChangePrefer(e)}>
                </textarea>
                <Upload
                    // action="https://image.floev.com/upload"
                    name="upload-image"
                    listType="picture-card"
                    fileList={preferFileList}
                    onPreview={(e) => handlePreview(e)}
                    onChange={(e) => handleChangePreferPhoto(e)}
                    beforeUpload={() => false} // setFileList(fileList.concat(file));
                >{preferFileList.length >= 3 ? null :
                    (<div>
                        <PlusOutlined />
                        <div>사진 업로드</div>
                    </div>)}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={() => handleCancel()}
                ><img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
            <div className="q-wrap__btn-wrap">
                <button className="q-wrap__btn q-wrap__btn-prev" type="button" disabled={props.currentStep !== props.max ? false : true} onClick={() => props.onPrev()}>이전</button>
                {prefer.length === 0 ? (
                    <button className="q-wrap__btn q-wrap__btn-next q-wrap__btn-next--disabled" type="button"><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>) :
                    (<button className="q-wrap__btn q-wrap__btn-next" type="button" onClick={() => props.onNext()}><span>다음</span> <img src="static/img/survey/ic-arrows-right.png" alt="" /></button>)
                }
            </div>
        </div>
    </>)
}