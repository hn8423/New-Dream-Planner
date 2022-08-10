import { classOption } from 'utill'
import style from './index.module.scss'
import { useMemo } from 'react'

const classname = classOption(style)

export default function ProgressBar({ className, maxLevel, currentLevel, ...props }) {
  const progress = useMemo(() => {
    let highlight = currentLevel
    let nonHighlight = maxLevel - currentLevel
    highlight = Array(highlight)
      .fill('')
      .map((v, i) => <div key={`highlight-${i}`} className={classname('highlight')}></div>)
    nonHighlight = Array(nonHighlight)
      .fill('')
      .map((v, i) => <div key={`non-highlight-${i}`} className={classname('non-highlight')}></div>)

    return (
      <>
        {highlight}
        {nonHighlight}
      </>
    )
  }, [maxLevel, currentLevel])
  return (
    <div className={classname(['progress-bar', className])} {...props}>
      {progress}
    </div>
  )
}
