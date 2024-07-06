export const formatFullDesc = (fullDesc) => {
  const updatedFullDesc = { ...fullDesc };

  // formatting Responsibilities data
  if (fullDesc.res) {
    updatedFullDesc.res = fullDesc.res.replace(/([^\s.])\s*$/gm, "$1.");
  }

  // formatting Requirements data
  if (fullDesc.require) {
    updatedFullDesc.require = fullDesc.require.replace(/([^\s.])\s*$/gm, "$1.");
  }

  // formatting skills data
  if (fullDesc.skills) {
    updatedFullDesc.skills = fullDesc.skills.replace(/\s*,\s*/g, ", ").trim();
  }

  return updatedFullDesc;
};
