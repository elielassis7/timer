import { differenceInSeconds } from 'date-fns'
import { CountDownContainer, Separator } from './styles'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentAsFinished,
    amountSecondsPassed,
    setSecondsAmount,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentAsFinished()
          setSecondsAmount(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsAmount(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentAsFinished,
    setSecondsAmount,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} `
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
