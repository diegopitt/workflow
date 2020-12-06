import { useState, useEffect } from 'react'
import {firebase} from '../lib/firebase-client'
import { useRouter } from 'next/router'
import { useUser } from '../lib/userContext'

const Register = (props) => {
  const { registerEvent} = useUser()
  const router = useRouter()
  const {toggleModal, saveData, event} = props
  const [enterCode, setEnterCode] = useState(false)
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null)
  const [confirmationResult, setconfirmationResult] = useState(false)
  const [phone, setPhone] = useState('')
  const [signingIn, setsigningIn] = useState(false)
  const [continueEnabled, setContinueEnabled] = useState(false) //check if valid phone
  const [verifyingCode, setVerifyingCode] = useState()
  const [verificationCode, setVerificationCode] = useState('')

  const closeModal = () => {
    recaptchaVerifier.clear()
    toggleModal(false)
  }
	const onSignInSubmit = () => {
    setsigningIn(true);
    const error = validateInput(phone);
    console.log(error)
    if (error) return
		firebase.auth().signInWithPhoneNumber('+52' + phone, recaptchaVerifier)
		.then(function (confirmationResult) {
      setconfirmationResult(confirmationResult)
      setsigningIn(false);
			setEnterCode(true)
		}).catch(function (error) {
			console.error('Error during signInWithPhoneNumber:\n\n' + error.code + '\n\n' + error.message);
			setsigningIn(false);
		});
	}
  const onVerifyCodeSubmit = (e) => {
		e.preventDefault();
    if (verificationCode) {
      setVerifyingCode(true);
      confirmationResult.confirm(verificationCode).then( async (result) => {
        if(saveData){
          await registerEvent(result.user.uid, event.key, event, result.user.phoneNumber)
        }
        toggleModal(false)
        router.push('/?logged')
      }).catch(function (error) {
        console.error('Error while checking the verification code', error);
        console.error('Error while checking the verification code:\n\n' + error.code + '\n\n' + error.message);
      	setVerifyingCode(false);
      });
    }
  }
  const validateInput = value => {
    let error = false
    if (value.length !== 14) error = true;
    return error;
  };
  const normalizeInput = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  };
  const handleChange =(e) => {
    const { value, name } = e.target;
    if (name === 'phone-number'){
      setPhone(normalizeInput(value, phone))
      if (value.length === 14)(
        setContinueEnabled(true)
      )
    }
		if (name === 'verificationCode'){
			setVerificationCode(value)
		}
  };

  useEffect(() => {
		let isMounted = true
		if(isMounted){
			setRecaptchaVerifier(new firebase.auth.RecaptchaVerifier('continue-btn', {'size': 'invisible'	}));
		}
    return () => { isMounted = false };
  }, []);

    return (
			<div>
				<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div className="sm:flex sm:items-start">
						<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-teal-400  sm:mx-0 sm:h-10 sm:w-10">
						<svg className="w-6 h-6" fill="none" stroke="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
						</div>
						<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
							Ingresa a workflow
							</h3>
							<div className="mt-3">
								<div className={`${enterCode ? 'hidden' : 'block'} col-span-6 sm:col-span-6 lg:col-span-2`}>
									<label htmlFor="phonenumberinput" className="block text-sm font-medium leading-5 text-gray-700">Numero de Telefono</label>
									<div className="mt-3 flex rounded-md">
										<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
										</span>
										<input type="text" name="phone-number" placeholder="(xxx) xxx-xxxx" value={phone} onChange={(e) => handleChange(e)} className="outline-none focus:outline-none form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
									</div>
								</div>
								<div className={`${!enterCode ? 'hidden' : 'block'}  col-span-6 sm:col-span-6 lg:col-span-2`}>
									<label htmlFor="code" className="block text-sm font-medium leading-5 text-gray-700">Ingrese el codigo de verificacion</label>
									<div className="mt-3 flex rounded-md">
										<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
										<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
										</span>
										<input onChange={(e) => handleChange(e)} value={verificationCode} id="verificationCode" name="verificationCode" className="outline-none focus:outline-none form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-100 border-t border-gray-300 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
					<span className="flex w-full rounded-md sm:ml-3 sm:w-auto">
						{!enterCode ?
							<button onClick={() => onSignInSubmit()} disabled={!continueEnabled} data-badge="bottomleft" id="continue-btn" type="button" className={`${!continueEnabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'} inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm  focus:outline-none sm:text-sm sm:leading-5`}>
              {signingIn && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>}
                Continuar
              </button>
						:
							<button onClick={(e) => onVerifyCodeSubmit(e)} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-base leading-6 font-medium text-white shadow-sm  focus:outline-none sm:text-sm sm:leading-5">
              {verifyingCode && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>}
              Ingresar
              </button>
						}
					</span>
					<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
						<button onClick={() => closeModal()} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">Cancelar</button>
					</span>
				</div>
			</div>
    )
  }
  
  export default Register