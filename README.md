<!-- Logo -->
# **Frontend of**
<img src="src/assets/logo.png" alt="Spend Guide" height="80" />

<div style="display: flex; align-items: center; justify-content: center;">

[![Netlify](https://img.shields.io/badge/deployed%20on%20netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)](https://www.netlify.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

#

<!-- Screenshots -->
<div 
    style="display:flex; flex-direction: column; align-items: center; justify-content: between; width: 100%;padding-bottom: 65px;" 
>
    <div style="display:flex; flex-direction: column; align-items: center; justify-content: between; width: 100%;">
        <img
            src="src/assets/screenshot.png"
            alt="PC screenshot"
        />
    </div>
</div>

## This repo contains the **frontend** of the **Spend Guide** application built with **React.js**
It provides a user-friendly responsive interface to track incomes, expenses with graph and charts to visualize spending pattern.

Check out the live demo of the app: [Spend Guide↗](https://spend-guide.netlify.app/)
> IMP: Might took some time(around 2-3 mins) for first response in a while from the backend due to the limitation of [Render↗](https://render.com/) free instance.

- ### Features:

    1. Add, delete, modify entry logs of **incomes**, **expenses** and **categories**.
    2. User authentication using **JSON web token**.
    3. Interactive charts to **visualize** spending pattern.
    4. **Export/Download** transaction datas.
    5. Responsive UI with **tailwind CSS**.
    6. Integrated Spring Boot **REST API** backend.

---

- ### Tech stack used:

    * [![Vite](https://img.shields.io/badge/vite%20v7.1.2-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/guide/)
    * [![React](https://img.shields.io/badge/react%20v19.1.1-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/learn)
    * [![NPM](https://img.shields.io/badge/Recharts%20v3.1.2-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://recharts.org/en-US)
    * [![NPM](https://img.shields.io/badge/React%20hot%20toast%20v2.6.0-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://react-hot-toast.com/)
    * [![Context-API](https://img.shields.io/badge/React%20Router%20v7.8.1-000000?style=for-the-badge&logo=react)](https://reactrouter.com/home)
    * [![TailwindCSS](https://img.shields.io/badge/tailwindcss%20v4.1.12-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

- ### Local Installation and Setup Guide:

    1. Clone the repository:
        ```
            git clone https://github.com/<your_username>/spend-guide-frontend.git
        ```

    2. Install all dependencies:
        ```
            npm install
        ```

    3. Create a ```.env``` file:
        - For that, open an account in [Cloudinary↗](https://cloudinary.com/)
        - Note down the **name** from the **upload presets**.
        - And, note down the last string after **@** in **API keys** section.
        - Make those two as two environment variables:
            ```
                VITE_IMG_UPLOAD_CLOUDINARY=https://api.cloudinary.com/v1_1/<your_string_value>/image/upload
                VITE_UPLOAD_PRESET_CLOUDINARY=<your_upload_presets_name>
            ```
        - Create another environment vaiable for backend API(After running it locally):
            ```
                VITE_API_BASE_URL=http://localhost:8080/api/v1
            ```
        > For more details checkout the [official documentation of Cloudinary↗](https://cloudinary.com/documentation/upload_images#unauthenticated_requests)

    4. Run the development server in the terminal:
        ```
            npm run dev
        ```

---

## **🤝 Contributing**
### Pull request are always welcome.
### For major changes, please open an issue first to discuss what do you like to change.