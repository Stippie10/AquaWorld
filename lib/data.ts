import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'public/data/users.json');
const BLOGS_FILE = path.join(process.cwd(), 'public/data/blogs.json');
const STAFF_FILE = path.join(process.cwd(), 'public/data/staff.json');

// Initialize data files if they don't exist
function initializeFiles() {
  if (!fs.existsSync(path.dirname(USERS_FILE))) {
    fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
  }

  const usersData = {
    users: [
      {
        id: '1',
        username: 'admin',
        passwordHash: '$2a$10$YIjlrjYjlrjYjlrjYjlrjO.x0mZV0mZV0mZV0mZV0mZV0mZV0mZV0', // Will be set on first run
        role: 'admin'
      },
      {
        id: '2',
        username: 'mist',
        passwordHash: '$2a$10$YIjlrjYjlrjYjlrjYjlrjO.x0mZV0mZV0mZV0mZV0mZV0mZV0mZV0', // Will be set on first run
        role: 'admin'
      }
    ]
  };

  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersData, null, 2));
  }

  if (!fs.existsSync(BLOGS_FILE)) {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify({ blogs: [] }, null, 2));
  }

  if (!fs.existsSync(STAFF_FILE)) {
    const staffData = {
      serverIp: null,
      team: [],
      vacancies: [
        {
          id: '1',
          title: 'Moderator',
          description: 'We are looking for active moderators!',
          discordUrl: 'https://discord.gg/aquaworld'
        }
      ]
    };
    fs.writeFileSync(STAFF_FILE, JSON.stringify(staffData, null, 2));
  }
}

// Get data
export function getUsers() {
  initializeFiles();
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function getBlogs() {
  initializeFiles();
  try {
    const data = fs.readFileSync(BLOGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { blogs: [] };
  }
}

export function getStaff() {
  initializeFiles();
  try {
    const data = fs.readFileSync(STAFF_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { serverIp: null, team: [], vacancies: [] };
  }
}

// Save data
export function saveUsers(data: any) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

export function saveBlogs(data: any) {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(data, null, 2));
}

export function saveStaff(data: any) {
  fs.writeFileSync(STAFF_FILE, JSON.stringify(data, null, 2));
}
