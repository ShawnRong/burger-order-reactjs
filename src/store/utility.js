export const updateOjbect = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}