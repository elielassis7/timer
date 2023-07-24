import { HandPalm, Play } from 'phosphor-react'
import { NewCycleForm } from './components/NewCycleForm/Index'
import { CountDown } from './components/CountDown/Index'
import * as z from 'zod'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { useContext } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { CyclesContext } from '../../contexts/CyclesContext'

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleFormValidationSchema = z.object({
    task: z.string().min(3, 'Informe o nome da tarefa!'),
    minutesAmount: z
      .number()
      .min(5, 'apenas valores entre 5 e 60')
      .max(60, 'apenas valores entre 5 e 60'),
  })

  type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
