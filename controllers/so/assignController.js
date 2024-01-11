import { toolbars } from './utilities.js'
import officerService from '../../services/officerService.js'
import * as districtService from '../../services/districtService.js'
import * as wardService from '../../services/wardService.js'
import emailService from '../../services/emailService.js'
import { hashPassword, comparePassword } from '../../services/passwordService.js'

const show = async (req, res) => {
  const officers = await officerService.getAllOfficersByPosition()
  const tableHeads = ['No', 'Tên đăng nhập', 'Chức vụ', 'Quận', 'Phường']
  const tableData = officers
    .map((officer) => {
      return {
        username: officer.username,
        position: officer.position === 1 ? 'Cán bộ Quận' : officer.position === 2 ? 'Cán bộ Phường' : 'Chưa phân công',
        districtID: officer.districtID,
        district: officer.districtName || '',
        wardID: officer.wardID,
        ward: officer.wardName || '',
        isAssigned: officer.position !== 0,
        actions: {
          edit: true,
          remove: true,
          info: true
        }
      }
    })
    .sort((a, b) => {
      if (a.isAssigned && !b.isAssigned) return 1
      if (!a.isAssigned && b.isAssigned) return -1
      return 0
    })

	console.log(tableData)

  const totalOfficers = tableData.length
  const numberOfAssignedOfficers = tableData.filter((officer) => officer.isAssigned).length

  const districts = await districtService.getAllDistricts()
  const wards = await wardService.getAllWards()

  res.render('./so/assign', {
    title: 'Sở - Phân công',
    tableHeads,
    tableData,
    toolbars: toolbars,
    totalOfficers,
    numberOfAssignedOfficers,
    districts,
    wards
  })
}

const deleteAccount = async (req, res) => {
  const username = req.params.username
  try {
    if (username != null) {
      const { message } = await officerService.deleteOfficerByUsername(username)
      console.log(message)
      res.status(200).json({ message: message })
    }
  } catch (error) {
    console.log(error.message)
    req.flash('error', error.message)
    res.status(500).json({ message: error.message })
  }
  // res.redirect('/so/assign');
}

const getWards = async (req, res) => {
  const districtID = req.params.id
  const wards = await wardService.getWardsOfDistrict(districtID)
  res.json(wards)
}

const updateOfficer = async (req, res) => {
  const username = req.params.username
  const dataToUpdate = req.body

  try {
    const { message } = await officerService.updateOfficer(username, dataToUpdate)
    console.log(message)
    // res.redirect('/so/assign');
    res.status(200).json({ message: message })
  } catch (error) {
    console.log(error.message)
    req.flash('error', error.message)
    // res.redirect('/so/assign');
    res.status(500).json({ message: error.message })
  }
}

const addOfficer = async (req, res) => {
  const { username, email } = req.body
  let newPassword = generateRandomPassword()

  emailService.sendNewPassword(email, newPassword)

  newPassword = await hashPassword(newPassword)

  const newData = {
    username: username,
    password: newPassword,
    email: email,
    position: 0,
    districtID: '',
    wardID: ''
  }

  try {
    const message = await officerService.createOfficer(newData)
    console.log(message)
    req.flash('success', message)
    res.redirect('/so/assign')
  } catch (error) {
    console.log(error.message)
    req.flash('error', error.message)
    res.redirect('/so/assign')
  }
}

function generateRandomPassword() {
  const length = 8
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset.charAt(randomIndex)
  }
  return password
}

export default { show, deleteAccount, getWards, updateOfficer, addOfficer }
