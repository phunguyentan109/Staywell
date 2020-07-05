import Price from '../components/Price'
import withBreadCrumb from 'hocs/withBreadCrumb'
import withToggleModal from 'hocs/withToggleModal'

export default withBreadCrumb(withToggleModal(Price))
