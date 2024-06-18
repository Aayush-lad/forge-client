"use client"

import Modal from '@/components/ui/Modal'
import React from 'react'
import { useEffect ,useState} from 'react'
import { useRouter,useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Welcome from '@/components/ui/Welcome'


const page = () => {

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const welcome = searchParams.get('welcome')
  const [step,setStep] = useState(1);

  useEffect(() => {
    console.log(welcome)
    if (Boolean(welcome) === true) {
      setIsModalOpen(true);
    }
  }, [welcome]);

  const closeModal = () => {
    setIsModalOpen(false);
    router.replace('/dashboard', undefined, { shallow: true });
  };

  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {/* Create Organisation  */}
      <Welcome step={step} setStep={setStep}/>
    </Modal>
  </div>
  )
}
export default page