#  InterAIview

**InterAIview** is a full-stack AI-powered web application that helps users **analyze resumes**, **prepare for interviews**, and **track their interview journey** — all in one place.

---

## What This Web App Does

*  **Resume Analyzer:**

  * Upload resume (PDF)
  * Paste Job Description
  * Get:
    * Match score
    * Matched & missing skills
    * AI-generated resume feedback

*  **AI Interview Assistant:**

   * Section-based interview questions:
      * Introduction, Technical, Behavioral, HR, Group Discussion
   * Voice + text answers
   * AI evaluates answers with score & feedback

*  **Authentication:**

   * Signup & Login
   * JWT-based authentication
   * Persistent login using localStorage

*  **User History:**

   *  Resume analysis history
   *  Interview Q&A + AI feedback history
   *  User-specific data stored securely

---

##  Tech Stack

### Frontend

* React (JS / JSX), React Router
* Context API (Auth management)

### Backend

* Flask (Python) - CORS
* JWT Authentication
* REST APIs

### Database

* MongoDB Atlas

### AI Integration

* Groq API
* Model: `llama-3.3-70b`
* Used for:
  * Resume feedback
  * Interview question generation
  * Answer evaluation

---

##  Running Locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend: `http://localhost:3000`
Backend: `http://127.0.0.1:5000`

---

##  Screenshots

  <img width="1920" height="1020" alt="Screenshot 2026-01-15 205013" src="https://github.com/user-attachments/assets/a6f9d831-967d-4de2-9e93-6d238ed5101e" />
  
  <img width="1920" height="968" alt="Screenshot 2026-01-14 143327" src="https://github.com/user-attachments/assets/6b6623ec-a66b-446d-b9fe-4e56058162b8" />

  <img width="1920" height="1017" alt="image" src="https://github.com/user-attachments/assets/89d79a05-44b5-49fe-bd94-0a3d127382fc" />

  <img width="1920" height="1080" alt="Screenshot 2026-01-14 145258" src="https://github.com/user-attachments/assets/ac6136c1-64a5-429c-9670-421948ebb919" />

  



---

## 👨‍💻 Author

SoniG07

