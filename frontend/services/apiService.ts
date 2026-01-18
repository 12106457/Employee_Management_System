const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface Employee {
  id: string;
  fullName: string;
  gender: string;
  dob: string;
  state: string;
  active: boolean;
  profileImage?: string | null;
}

interface EmployeeFormData {
  fullName: string;
  gender: string;
  dob: string;
  state: string;
  active: boolean;
  profileImage?: File | string | null;
}


const convertBufferToImage = (employee: any): Employee => {
  if (employee.profileImage && employee.profileImage.data) {
    
    const arr = new Uint8Array(employee.profileImage.data);
    const binaryString = String.fromCharCode.apply(null, Array.from(arr));
    const base64 = btoa(binaryString);
    employee.profileImage = `data:image/jpeg;base64,${base64}`;
  } else if (employee.profileImage && typeof employee.profileImage === 'object') {
    try {
      const buffer = Buffer.from(employee.profileImage);
      employee.profileImage = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    } catch (e) {
      employee.profileImage = null;
    }
  }
  return employee;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const apiService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  async register(name: string, email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }

    return response.json();
  },

  async getEmployees(): Promise<Employee[]> {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }

    const employees = await response.json();
    // Convert Buffer to base64 for each employee
    return employees.map(convertBufferToImage);
  },

  async addEmployee(data: EmployeeFormData): Promise<Employee> {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('gender', data.gender);
    formData.append('dob', data.dob);
    formData.append('state', data.state);
    formData.append('active', String(data.active));

    if (data.profileImage instanceof File) {
      formData.append('profileImage', data.profileImage);
    }

    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    const employee = await response.json();
    return convertBufferToImage(employee);
  },

  async updateEmployee(id: string, data: EmployeeFormData): Promise<Employee> {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('gender', data.gender);
    formData.append('dob', data.dob);
    formData.append('state', data.state);
    formData.append('active', String(data.active));

    if (data.profileImage instanceof File) {
      formData.append('profileImage', data.profileImage);
    }

    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to update employee');
    }

    const employee = await response.json();
    return convertBufferToImage(employee);
  },

  async deleteEmployee(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }
  }
};
