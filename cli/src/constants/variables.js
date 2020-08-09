import { 
  HomeOutlined,
  UserOutlined,
  DollarOutlined,
  IdcardOutlined,
  InsertRowLeftOutlined,
  FileProtectOutlined
} from '@ant-design/icons'

export const breadcrumbNames = {
  '/app': {
    name: 'Dashboard',
    icon: HomeOutlined
  },
  '/app/people': {
    name: 'Manage People',
    icon: UserOutlined
  },
  '/app/price': {
    name: 'Manage Price',
    icon: DollarOutlined
  },
  '/app/profile': {
    name: 'Manage Profile',
    icon: IdcardOutlined
  },
  '/app/rooms': {
    name: 'Manage Room',
    icon: InsertRowLeftOutlined
  },
  '/app/people/contract': {
    name: 'Manage Contract',
    icon: FileProtectOutlined
  },
}
