import React, { useState } from 'react'
import { View, Text } from 'react-native'

import Button, { IconButton } from '../Common/Button'
import {
  TextField,
  AmountField,
  CategoryField,
  PeriodField,
  DateField,
  ToggleField,
  DateTimePreviewField,
} from '../Form'
import ScrollableContainer from '../Common/ScrollableContainer'
import useBottomSheet from '../../hooks/useBottomSheet'
import useToast from '../../hooks/useToast'
import { Action } from '../../types/action'
import ConfirmationModal from '../Modal/ConfirmationModal'
import { Policy, Period } from '../../types/policy'
import { addPolicy, deletePolicy, editPolicy } from '../../apis/policy'

const PolicyContent = ({
  policy,
  action,
}: {
  policy?: Policy
  action: Action
}) => {
  const toast = useToast()

  const { handleOpenBottomSheet, setBottomSheetContent } = useBottomSheet()

  const [categoryId, setCategoryId] = useState<string>(
    policy ? policy.categoryId : ''
  )
  const [name, setName] = useState<string>(policy ? policy.name : '')
  const [policyNo, setPolicyNo] = useState<string>(
    policy ? policy.policyNo : ''
  )
  const [amount, setAmount] = useState<string>(policy ? policy.amount : '0')
  const [plan, setPlan] = useState<string>(policy ? policy.plan : '')
  const [inForceDate, setInForceDate] = useState<string>(
    policy ? policy.inForceDate : ''
  )
  const [period, setPeriod] = useState<Period | ''>(policy ? policy.period : '')
  const [getNotified, setGetNotified] = useState<boolean>(
    policy ? policy.getNotified : true
  )

  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isTrashIconLoading, setIsTrashIconLoading] = useState<boolean>(false)

  const handleAddPolicy = async () => {
    setIsLoading(true)

    try {
      await addPolicy({
        categoryId,
        name,
        policyNo,
        amount,
        plan,
        inForceDate,
        period: period as Period,
        getNotified,
      })
      handleOpenBottomSheet()
      toast('New policy added!', true)
    } catch (error) {
      toast('Failed to add new policy!', false)
    }

    setIsLoading(false)
  }

  const handleEditPolicy = async (isRestore: boolean = false) => {
    if (!policy) return

    setIsLoading(true)

    try {
      await editPolicy(
        policy.id,
        isRestore
          ? {
              isTrashed: false,
            }
          : {
              categoryId,
              name,
              policyNo,
              amount,
              plan,
              inForceDate,
              period: period as Period,
              getNotified,
            }
      )
      handleOpenBottomSheet()
      toast(`Policy ${isRestore ? 'restored' : 'updated'}!`, true)
    } catch (error) {
      toast(`Failed to ${isRestore ? 'restored' : 'updated'} policy!`, false)
    }

    setIsLoading(false)
  }

  const handleDelete = async (isMoveToTrash: boolean = false) => {
    if (!policy) return

    setIsTrashIconLoading(true)

    try {
      isMoveToTrash
        ? await editPolicy(policy.id, {
            isTrashed: true,
          })
        : await deletePolicy(policy.id)
      setOpen(false)
      handleOpenBottomSheet()
      toast(`Policy ${isMoveToTrash ? 'moved to trash' : 'deleted'}!`, true)
    } catch (error) {
      toast(
        `Failed to ${
          isMoveToTrash ? 'move policy to trash' : 'delete policy'
        }!`,
        false
      )
    }

    setIsTrashIconLoading(false)
  }

  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => (isTrashIconLoading ? {} : setOpen(false))

  const handleEditMode = () =>
    setBottomSheetContent(<PolicyContent policy={policy} action='EDIT' />)

  const isFilled =
    categoryId !== '' &&
    name !== '' &&
    policyNo !== '' &&
    amount !== '0' &&
    period !== '' &&
    inForceDate !== ''

  const isSameValue =
    policy !== undefined &&
    categoryId === policy.categoryId &&
    name === policy.name &&
    policyNo === policy.policyNo &&
    amount === policy.amount &&
    period === policy.period &&
    inForceDate === policy.inForceDate &&
    plan === policy.plan &&
    getNotified === policy.getNotified

  const content = {
    title: '',
    readOnly: false,
    showDeleteIcon: false,
    deleteIconAction: () => {},
    buttonText: '',
    buttonAction: () => {},
    buttonDisabled: false,
    showXIcon: false,
  }

  switch (action) {
    case 'ADD':
      content.title = 'New Policy'
      content.readOnly = false
      content.showDeleteIcon = false
      content.deleteIconAction = () => {}
      content.buttonText = 'Add'
      content.buttonAction = handleAddPolicy
      content.buttonDisabled = !isFilled
      content.showXIcon = true
      break

    case 'EDIT':
      content.title = 'Edit Policy'
      content.readOnly = false
      content.showDeleteIcon = true
      content.deleteIconAction = handleOpenModal
      content.buttonText = 'Update'
      content.buttonAction = () => handleEditPolicy(false)
      content.buttonDisabled = !isFilled || isSameValue
      content.showXIcon = true
      break

    case 'DELETE':
      content.title = 'Policy'
      content.readOnly = true
      content.showDeleteIcon = true
      content.deleteIconAction = handleOpenModal
      content.buttonText = 'Restore'
      content.buttonAction = () => handleEditPolicy(true)
      content.buttonDisabled = false
      content.showXIcon = true
      break

    default: // VIEW
      content.title = 'Policy'
      content.readOnly = true
      content.showDeleteIcon = false
      content.deleteIconAction = () => {}
      content.buttonText = 'Edit'
      content.buttonAction = handleEditMode
      content.buttonDisabled = false
      content.showXIcon = true
      break
  }

  return (
    <View className='flex-1 px-6'>
      <Text className='mb-2 font-js-mid text-lg text-neutral-900'>
        {content.title}
      </Text>

      <ToggleField
        label='Notification'
        value={getNotified}
        setValue={setGetNotified}
        readOnly={content.readOnly}
      />

      <View className='h-3' />

      <ScrollableContainer>
        <CategoryField
          value={categoryId}
          setValue={setCategoryId}
          required
          readOnly={content.readOnly}
        />

        <View className='h-4' />

        <TextField
          label='Name'
          placeholder='e.g. Ooi Si Sheng'
          value={name}
          setValue={setName}
          required
          readOnly={content.readOnly}
        />

        <View className='h-4' />

        <TextField
          label='Policy Number'
          placeholder='e.g. 1055210469'
          value={policyNo}
          setValue={setPolicyNo}
          required
          readOnly={content.readOnly}
        />

        <View className='h-4' />

        <View className='flex-row items-center justify-between space-x-4'>
          <View className='flex-1'>
            <AmountField
              label='Amount'
              value={amount}
              setValue={setAmount}
              required
              readOnly={content.readOnly}
            />
          </View>

          <View className='flex-1'>
            <PeriodField
              value={period}
              setValue={setPeriod}
              required
              readOnly={content.readOnly}
            />
          </View>
        </View>

        <View className='h-4' />

        <DateField
          label='In-Force Date'
          value={inForceDate}
          setValue={setInForceDate}
          required
          readOnly={content.readOnly}
        />

        <View className='h-4' />

        <TextField
          label='Plan'
          placeholder='e.g. SmartProtect Wealth Plus'
          value={plan}
          setValue={setPlan}
          readOnly={content.readOnly}
        />

        {policy !== undefined && (
          <>
            <View className='h-4' />

            <DateTimePreviewField label='Created At' time={policy.createdAt} />

            <View className='h-4' />

            <DateTimePreviewField
              label='Last Updated'
              time={
                policy.createdAt === policy.updatedAt ? '-' : policy.updatedAt
              }
            />
          </>
        )}
      </ScrollableContainer>

      <View className='my-4 h-px bg-neutral-200' />

      <View className='flex-row items-center justify-between'>
        {content.showDeleteIcon && (
          <>
            <IconButton
              type='delete'
              onPress={content.deleteIconAction}
              loading={isTrashIconLoading}
            />

            <View className='w-3' />
          </>
        )}

        <Button
          text={content.buttonText}
          onPress={content.buttonAction}
          fullWidth
          disabled={content.buttonDisabled}
          loading={isLoading}
        />

        {content.showXIcon && (
          <>
            <View className='w-3' />

            <IconButton type='cancel' onPress={handleOpenBottomSheet} />
          </>
        )}
      </View>

      {policy !== undefined && (
        <ConfirmationModal
          open={open}
          handleClose={handleCloseModal}
          title={
            policy.isTrashed
              ? 'Confirm Delete Policy?'
              : 'Confirm Move to Trash?'
          }
          body={
            policy.isTrashed
              ? 'This action is irreversible!'
              : 'This policy will be moved to trash. It can be restored from trash later.'
          }
          buttonText={policy.isTrashed ? 'Delete' : 'Move to Trash'}
          buttonAction={() => handleDelete(!policy.isTrashed)}
          buttonLoading={isTrashIconLoading}
        />
      )}
    </View>
  )
}

export default PolicyContent
