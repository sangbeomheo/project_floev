import Layout from '../layout/DefaultLayout'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import cookie from 'cookie'
import { GetServerSideProps } from 'next'
import { createApolloClient } from '../lib/apolloClient'
import { SIGN_IN_USER } from '../lib/mutation'
import { CHECKUP_USER } from '../lib/query'
import redirect from '../lib/redirect'

const LoginPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [isEmail, setIsEmail] = useState(true)
	const [validEmail, setValidEmail] = useState(true)
	const [password, setPassword] = useState('');
	const [isPassword, setIsPassword] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [validPassword, setValidPassword] = useState(true)

	const [signInUser] = useMutation(SIGN_IN_USER, {
		variables: {
			email: email, password: password
		},
		onCompleted(data) {
			if (data) {
				const token = data.signInUser.token
				document.cookie = cookie.serialize("token", token, {
					maxAge: 12 * 60 * 60
				})
				window.analytics.identify({
					email: email,
				});
				router.push('/')
			}
		},
		onError(error) {
			console.error(error.message)
			// 유저가 없을 때
			if (error.message === "No User") {
				setValidEmail(false)
			}// 비밀번호가 일치하지 않을 때
			else if (error.message === "Not valid password") {
				setValidEmail(true)
				setValidPassword(false)
			}
		}
	});

	const handleBlurEmail = () => {
		if (email.length === 0) {
			setIsEmail(false)
		}
	}

	const handleBlurPassword = () => {
		if (password.length === 0) {
			setIsPassword(false)
		}
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		let isMutate: boolean = true

		if (email.length === 0) {
			setIsEmail(false)
			isMutate = false
		}
		if (password.length === 0) {
			setIsPassword(false)
			isMutate = false
		}
		if (isMutate) {
			signInUser();
		}
	}

	return (
		<Layout title="플로브 - 나의 눈을 위한 안경 큐레이션 서비스">
			<div className="loginPage">
				<div className="login">
					<h2 className="login__title">로그인</h2>
					<div className="login__form">

						<form onSubmit={(e) => handleSubmit(e)}>
							<div className="input-box">
								<input className={!isEmail ? `input-box__input input-box__input--err` : `input-box__input`} type="text" placeholder="이메일" value={email} onFocus={() => setIsEmail(true)}
									onBlur={() => handleBlurEmail()}
									onChange={e => setEmail(e.target.value)} tabIndex={1} />
								<div className="input-box__btn-wrap">
									{email.length > 0 && (
										<span className="input-box__btn-erase" onClick={() => setEmail('')}></span>
									)}
								</div>

								<div className="input-box__msg-wrap">
									{!isEmail && (
										<span className="input-box__msg input-box__msg--err">이메일을 입력해주세요.</span>
									)}
								</div>
							</div>

							<div className="input-box">
								<input className={!isPassword ? `input-box__input input-box__input--err` : `input-box__input`}
									type={showPassword ? "text" : "password"} placeholder="비밀번호"
									value={password}
									onFocus={() => setIsPassword(true)}
									onBlur={() => handleBlurPassword()}
									onChange={e => setPassword(e.target.value)} tabIndex={2} />
								<div className="input-box__btn-wrap">
									{password.length > 0 && (
										<>
											<span className="input-box__btn-erase" onClick={() => setPassword('')}></span>
											<span className="input-box__btn-display" onClick={() => setShowPassword(!showPassword)}>{showPassword ? `가리기` : `표시`}</span>
										</>
									)}
								</div>
								<div className="input-box__msg-wrap">
									{!isPassword && (
										<span className="input-box__msg input-box__msg--err">비밀번호를 입력해주세요.</span>
									)}
								</div>
							</div>

							<div className="login__btn--submit">
								<button type="submit" tabIndex={3}>로그인하기</button>
							</div>
							<div className="login__msg-wrap">
								{!validEmail ? (
									<div className="login__msg login__msg--err">등록되지 않은 이메일입니다.</div>) : (!validPassword ? (<div className="login__msg login__msg--err">비밀번호가 일치하지 않습니다.</div>) : (''))
								}
							</div>

						</form>
					</div>
					<div className="login__link">
						<span>아직, 플로브 계정이 없으신가요?</span>
						<Link href="/signup">
							<a>회원가입하기</a>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const client = createApolloClient(context)
	const { user } = await client.query({ query: CHECKUP_USER })
		.then(({ data }) => {
			return { user: data.checkUpUser };
		}).catch((error) => {
			console.error(error.message)
			return { user: null };
		});

	if (user) {
		redirect(context, '/')
		return { props: {} }
	}

	return {
		props: {
			// this hydrates the clientside Apollo cache in the `withApollo` HOC
			apolloStaticCache: client.cache.extract(),
			user
		},
	}
}

export default LoginPage