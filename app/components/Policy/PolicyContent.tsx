import React, { useState } from 'react'
import { View, Text } from 'react-native'

import Button, { IconButton } from '../Common/Button'
import { TextField, AmountField, CategoryField, PeriodField } from '../Form'
import ScrollableContainer from '../Common/ScrollableContainer'
import useBottomSheet from '../../hooks/useBottomSheet'
import useToast from '../../hooks/useToast'
import { Action } from '../../types/action'
import ConfirmationModal from '../Modal/ConfirmationModal'
import { Policy, Period } from '../../types/policy'
import { editPolicy } from '../../apis/policy'

const PolicyContent = ({
  policy,
  action,
}: {
  policy?: Policy
  action: Action
}) => {
  const toast = useToast()

  const { handleOpenBottomSheet } = useBottomSheet()

  const [categoryId, setCategoryId] = useState<string>(
    policy ? policy.categoryId : ''
  )
  const [name, setName] = useState<string>(policy ? policy.name : '')
  const [policyNo, setPolicyNo] = useState<string>(
    policy ? policy.policyNo : ''
  )
  const [amount, setAmount] = useState<string>(
    policy ? policy.amount.toString() : '0'
  )
  const [plan, setPlan] = useState<string>(policy ? policy.plan : '')
  const [inforceDate, setInforceDate] = useState<string>(
    policy ? policy.inforceDate : new Date().toISOString()
  )
  const [period, setPeriod] = useState<Period | ''>(policy ? policy.period : '')
  const [getNotified, setGetNotified] = useState<boolean>(
    policy ? policy.getNotified : true
  )

  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isMoveToTrashLoading, setIsMoveToTrashLoading] =
    useState<boolean>(false)

  const handleAddPolicy = async () => {
    setIsLoading(true)

    try {
      // await addCategory({
      //   name,
      //   color,
      // })
      handleOpenBottomSheet()
      toast('New policy added!', true)
    } catch (error) {
      toast('Failed to add new policy!', false)
    }

    setIsLoading(false)
  }

  // const handleEditCategory = async () => {
  //   if (!category) return

  //   setIsLoading(true)

  //   try {
  //     await editCategory(category.id, {
  //       name,
  //       color,
  //     })
  //     handleOpenBottomSheet()
  //     toast('Category updated!', true)
  //   } catch (error) {
  //     toast('Failed to update category!', false)
  //   }

  //   setIsLoading(false)
  // }

  const handleMoveToTrash = async () => {
    if (!policy) return

    setIsMoveToTrashLoading(true)

    try {
      await editPolicy(policy.id, {
        isTrashed: true,
      })
      setOpen(false)
      handleOpenBottomSheet()
      toast('Policy moved to trash!', true)
    } catch (error) {
      toast('Failed to move policy to trash!', false)
    }

    setIsMoveToTrashLoading(false)
  }

  const handleOpenModal = () => setOpen(true)

  const handleCloseModal = () => (isMoveToTrashLoading ? {} : setOpen(false))

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
      content.buttonDisabled = name === ''
      content.showXIcon = true
      break

    // case 'EDIT':
    //   content.title = 'Edit Category'
    //   content.readOnly = false
    //   content.showDeleteIcon = true
    //   content.deleteIconAction = handleOpenModal
    //   content.buttonText = 'Update'
    //   content.buttonAction = handleEditCategory
    //   content.buttonDisabled =
    //     name === '' ||
    //     (category !== undefined &&
    //       name === category.name &&
    //       color === category.color)
    //   content.showXIcon = true
    //   break

    // default: // VIEW
    //   content.title = 'Category'
    //   content.readOnly = true
    //   content.showDeleteIcon = false
    //   content.deleteIconAction = () => {}
    //   content.buttonText = 'Close'
    //   content.buttonAction = handleOpenBottomSheet
    //   content.buttonDisabled = false
    //   content.showXIcon = false
    //   break
  }

  return (
    <View className='flex-1 px-6'>
      <Text className='mb-3 font-js-mid text-lg text-neutral-900'>
        {content.title}
      </Text>

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

        <AmountField
          label='Amount'
          value={amount}
          setValue={setAmount}
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

        <View className='h-4' />

        <PeriodField
          value={period}
          setValue={setPeriod}
          required
          readOnly={content.readOnly}
        />
      </ScrollableContainer>

      <View className='my-4 h-px bg-neutral-200' />

      <View className='flex-row items-center justify-between'>
        {content.showDeleteIcon && (
          <>
            <IconButton
              type='delete'
              onPress={content.deleteIconAction}
              loading={isMoveToTrashLoading}
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

      <ConfirmationModal
        open={open}
        handleClose={handleCloseModal}
        title='Confirm Move to Trash?'
        body='This policy will be moved to trash. It can be restored from trash later.'
        buttonText='Move to Trash'
        buttonAction={handleMoveToTrash}
        buttonLoading={isMoveToTrashLoading}
      />
    </View>
  )
}

export default PolicyContent
