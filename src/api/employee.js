import apiWithInterceptor from './middleware';

export const getEmployeesByPagination = async (pageNo, pageSize) => {
  try {
    const res = await apiWithInterceptor.get('/employees/pagination', {
      params: {pageNo, pageSize},
    });

    return res.data.data;
  } catch (err) {
    console.log('Error getEmployees', err);
  }
};

export const employeeDetails = async id => {
  try {
    const res = await apiWithInterceptor.get(`/employees/${id}`);

    return res.data.data;
  } catch (err) {
    console.log('Error employeeDetails', err);
  }
};

export const updateEmployeeDetails = async (id, details) => {
  try {
    const res = await apiWithInterceptor.put(`/employees/${id}`, details);

    return res;
  } catch (err) {
    console.log('Error updateEmployeeDetails', err);
  }
};

export const deleteEmployeeById = async id => {
  try {
    const res = await apiWithInterceptor.delete(`/employees/${id}`);

    return res;
  } catch (err) {
    console.log('Error deleteEmployeeById', err);
  }
};

export const addNewEmployee = async details => {
  try {
    const res = await apiWithInterceptor.post(`/employees`, details);

    return res;
  } catch (err) {
    console.log('Error addNewEmployee', err);
  }
};
