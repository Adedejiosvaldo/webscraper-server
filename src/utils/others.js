const deleteAllData = async () => {
  await Jumia.deleteMany();
  console.log("Deleted successfully");
};
