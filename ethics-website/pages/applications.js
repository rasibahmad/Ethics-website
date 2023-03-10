import { Textarea, Box, Button, Group, SimpleGrid, Table} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import ApplicationTable from '../components/ApplicationTable';

export default function Application() {
    const [applicationTitle, setApplicationTitle] = useState('')
    const [applicationError, setApplicationError] = useState(null)

    const createApplication = async (e) => {
        e.preventDefault()

        if (!applicationTitle) {
            setApplicationError('Please Enter Application Title')
            return
        }

        const { data, error } = await supabase
            .from('applications')
            .insert([{ applicationTitle }])

        if (error) {
            console.log(error)
            setApplicationError('Please Enter Application Title')
        }

        if (data) {
            console.log(data)
            setApplicationError(null)
        }
    }

    const [question, setQuestion] = useState('')
    const [questionError, setQuestionError] = useState(null)

    const createQuestion = async (e) => {
        e.preventDefault()

        if (!question) {
            setQuestionError('Please Enter Question')
            return
        }

        const { data, error } = await supabase
            .from('questions')
            .insert([{ question }])

        if (error) {
            console.log(error)
            setQuestionError('Please Enter Question')
        }

        if (data) {
            console.log(data)
            setQuestionError(null)
        }
    }

    const [fetchError, setFetchError] = useState(null)
    const [applicationsList, setApplicationsList] = useState([])

    useEffect(() => {
        const fetchApplications = async () => {
            const { data, error } = await supabase
                .from('applications')
                .select()

            if (error) {
                setFetchError('No Applications Found')
                setApplicationsList(null)
                console.log(error)
            }

            if (data) {
                setApplicationsList(data)
                setFetchError(null)
            }
        }
        
        fetchApplications()
    }, [])

    return (
        <SimpleGrid cols={2} spacing="xl" verticalSpacing="xl">
            <div className="create application">
                <form onSubmit={createApplication}>
                    <Box sx={{ maxWidth: 300 }} mx="auto" >
                        <h2>Create Ethics Application</h2>
                        <Textarea
                            placeholder="E.g. Knowledge Elicitation"
                            label="Name"
                            description="Enter name of application to create"
                            radius="md"
                            withAsterisk
                            onChange={(e) => setApplicationTitle(e.target.value)}
                        />
                        <Group position="right" mt="md">
                            <Button type="submit">Create</Button>
                        </Group>
                        {applicationError && <p className='error' style={{ color: "red" }}>{applicationError}</p>}
                    </Box>
                </form>
            </div>
            <div className="create question">
                <form onSubmit={createQuestion}>
                    <Box sx={{ maxWidth: 300 }} mx="auto" >
                        <h2>Ask Question</h2>
                        <Textarea
                            placeholder="E.g. Do I need approval for ...?"
                            label="Question"
                            description="Enter the full details of the question"
                            radius="md"
                            withAsterisk
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <Group position="right" mt="md">
                            <Button type="submit">Submit</Button>
                        </Group>
                        {questionError && <p className='error' style={{ color: "red" }}>{questionError}</p>}
                    </Box>
                </form>
            </div>
            <div className="track applications" >
                <Table highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                        <th>Application Title</th>
                        <th>ID</th>
                        <th>Created Date</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    {fetchError && <p className='error' style={{ color: "red" }}>{fetchError}</p>}
                    <tbody>
                    {applicationsList && (
                        applicationsList.map(application => (
                            <ApplicationTable key={application.id} application={application}/>
                        ))
                    )}
                    </tbody>
                </Table>
            </div>
        </SimpleGrid>
    )

}