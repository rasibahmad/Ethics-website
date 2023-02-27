import { Textarea, Group, Button, TextInput, Checkbox } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../client'

const completeApp = () => {
  const router = useRouter()
  const { id } = router.query
  const [applicationTitle, setApplicationTitle] = useState('')
  const [applicationError, setApplicationError] = useState(null)
  const [student_name, setStudentName] = useState('')
  const [student_number, setStudentNumber] = useState('')
  const [student_email, setStudentEmail] = useState('')
  const [project_objectives, setProjectObjectives] = useState('')
  const [study_objectives, setStudyObjectives] = useState('')
  const [data_collection_method, setDataCollectionMethod] = useState('')
  const [data_collected, setDataCollected] = useState('')
  const [participant_recruitment, setParticipantRecruitment] = useState('')
  const [data_storage, setDataStorage] = useState('')
  const [data_evidence, setDataEvidence] = useState('')
  const [risk, setRisk] = useState('')
  const [comments, setComments] = useState('')

  const applicationForm = async (e) => {
    e.preventDefault()

    if (!student_email || !student_name || !student_number || !project_objectives || !study_objectives || !data_collection_method || !data_collected || !participant_recruitment || !data_storage || !data_evidence || !risk) {
      setApplicationError('Please complete the application form')
      return
    }

    const {data, error} = await supabase 
      .from('applications')
      .update({student_email, student_number, student_name, project_objectives, study_objectives, data_collection_method, data_collected, participant_recruitment, data_storage, data_evidence, risk, comments})
      .eq('id', id)
      .select()

      if(error){
        setApplicationError('Please complete the application form')
      }

      if (data) {
        setApplicationError(null)
      }
  }

  useEffect(() => {
    const fetchApplication = async () => {
      const { data, error } = await supabase
        .from('applications')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        router.push('/applications')
      }

      if (data) {
        setApplicationTitle(data.applicationTitle)
        console.log(data)
      }
    }
    fetchApplication()
  }, [id])

  return (
    <div className="application">
      <h3>Application: {applicationTitle}</h3>
      <h4>Application ID: {id}</h4>
      <form onSubmit={applicationForm}>
        <TextInput
          placeholder=""
          label="Student Name"
          //description="Enter name of application to create."
          radius="md"
          withAsterisk
          onChange={(e) => setStudentName(e.target.value)}
        />
        <TextInput
          placeholder=""
          label="Student Email"
          //description="Enter name of application to create."
          radius="md"
          withAsterisk
          onChange={(e) => setStudentEmail(e.target.value)}
        />
        <TextInput
          placeholder=""
          label="Student Number"
          description="Enter 9-digit Student number"
          radius="md"
          withAsterisk
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <Textarea
          placeholder=""
          label="Project Objectives"
          description="Please provide a brief outline of your overall project objectives"
          radius="md"
          withAsterisk
          autosize
          minRows={2}
          onChange={(e) => setProjectObjectives(e.target.value)}
        />
        <Textarea
          placeholder=""
          label="Study Objectives"
          description="Please explain how the study you are seeking ethical approval to conduct contributes to your overall project objectives"
          radius="md"
          withAsterisk
          autosize
          minRows={2}
          onChange={(e) => setStudyObjectives(e.target.value)}
        />
        <Textarea
          placeholder=""
          label="Data Collection Method(s) to be Used"
          description="Please outline your proposed data collection methods – e.g., questionnaire/survey, interview, observational study, etc. Justify their use and explain how you will conduct the data collection in practice, including timeframe"
          radius="md"
          withAsterisk
          autosize
          minRows={2}
          onChange={(e) => setDataCollectionMethod(e.target.value)}
        />
        <Textarea
          placeholder=""
          label="Data to be Collected"
          description="Please briefly outline the type of data to be collected"
          radius="md"
          withAsterisk
          autosize
          minRows={2}
          onChange={(e) => setDataCollected(e.target.value)}
        />
        <Textarea
          placeholder=""
          label="Participant Recruitment"
          description="Please outline how you will recruit participants to your study"
          radius="md"
          withAsterisk
          autosize
          minRows={2}
          onChange={(e) => setParticipantRecruitment(e.target.value)}
        />
        <Textarea
          placeholder=""
          label="Data Storage"
          description="Please outline where you will store your data (ideally, on an encrypted server; USB drives are not permissible)"
          radius="md"
          withAsterisk
          autosize
          minRows={2}
          onChange={(e) => setDataStorage(e.target.value)}
        />
        <Textarea
          placeholder=""
          label="For Secondary Data/Dataset Use Only: Compliance with Terms & Conditions of Use"
          description="If you will be in receipt of secondary data OR will be using an online, publicly available dataset, please provide evidence that you are observing any terms and conditions associated with its use and have permission to use it. Be mindful that just because data is available online does not mean that you are ethically entitled to use it for your study; this needs proven. If you are being given data by, for example, a third party, you need to be sure that the individual has permission to share the data with you."
          radius="md"
          withAsterisk
          autosize
          minRows={2}
          onChange={(e) => setDataEvidence(e.target.value)}
        />
        <Textarea
          placeholder=""
          label="Risk"
          description="Please outline any risks to either the participants in your study and/or yourself in the conduct of the study and what you have done to mitigate that risk"
          radius="md"
          withAsterisk
          autosize
          minRows={2}
          onChange={(e) => setRisk(e.target.value)}
        />
        <Textarea
          placeholder=""
          label="Additional Comments"
          radius="md"
          autosize
          minRows={2}
          onChange={(e) => setComments(e.target.value)}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
        {applicationError && <p className='error' style={{ color: "red" }}>{applicationError}</p>}
      </form>
    </div>
  )
}

export default completeApp