import { createContext, useState } from "react"
export const ThemeContext = createContext(null)
import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"

const cx = classNames.bind(styles)

const DefaultLayout = ({ children }) => {
  const [totalPay, setTotalPay] = useState(0)

  return (
    <div className={cx("default")}>
      <ThemeContext.Provider
        value={{
          totalPay, setTotalPay,
        }}
      >
        <div className={cx("cs-content")}>
          <div className="col-md-8">
            <div className={cx("container p-0")}>{children}</div>
          </div>
        </div>
      </ThemeContext.Provider>
    </div>
  )
}

export default DefaultLayout
