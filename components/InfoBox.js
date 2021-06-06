import PropTypes from 'prop-types'

const InfoBox = ({ children }) => (
  <div className="info">
    <style jsx>
      {`
      .info {
        margin-top: 20px;
        margin-bottom: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-top: 1px solid #ececec;
        border-bottom: 1px solid #ececec;
      }
    `}
    </style>
    {children}
  </div>
)

export default InfoBox

InfoBox.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
}
