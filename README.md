
# Interview.io

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)  
**Interview.io** is a Generative AI-powered interview platform designed to redefine how interviews are conducted. With adaptive question generation, real-time interaction tools, and advanced analytics, it offers an intelligent, personalized, and efficient interviewing experience for candidates and recruiters alike.



## 🚀 Features

- **Generative AI Questioning**  
  Dynamically generates tailored questions based on the candidate's background and real-time responses.

- **Live Video & Audio**  
  Seamless video streaming with easy-to-use controls for toggling camera and microphone.

- **Speech Recognition & Transcription**  
  Captures candidate responses in real time for review and analysis.

- **Stage-Based Interview Progression**  
  Visual progress tracking for structured and clear interview sessions.

- **Customizable Interface**  
  Light and dark mode support for an accessible and user-friendly experience.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, TypeScript, Next.js, Tailwind CSS  
- **Backend**: Flask, Python  
- **APIs**: Custom AI Question Generation API  
- **Speech & Video**: WebRTC, Web Speech API  
- **Deployment**: Docker, GCP

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Docker (optional for containerized deployment)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Interview.io.git
   cd Interview.io
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python app.py
   ```

5. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. Access the app at [http://localhost:3000](http://localhost:3000).

---

## 🤖 Generative AI API

The project utilizes a custom Flask API for question generation.  
### API Endpoint:  
**POST** `/api/generate-questions`  
- **Input**: Candidate introduction  
- **Output**: List of AI-generated interview questions  

Example cURL Request:
```bash
curl -X POST http://127.0.0.1:5000/api/generate-questions \
-H "Content-Type: application/json" \
-d '{
  "intro": "I have experience in Python programming, data analysis, and machine learning."
}'
```

---

## 📐 Project Structure

```
Interview.io/
├── frontend/           # Next.js frontend code
├── backend/            # Flask backend code
├── api/                # Generative AI API scripts
├── assets/             # Static assets (images, icons)
├── README.md           # Project documentation
├── LICENSE             # License file
```

---

## 🌟 Features in Progress

- Advanced AI analytics for candidate evaluation.  
- Integration with third-party recruitment tools.  
- Comprehensive interview summaries and reporting.  

---

## 🧑‍💻 Contributing

We welcome contributions to enhance **Interview.io**!  
1. Fork the repository.  
2. Create a new branch for your feature or bug fix:  
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to the branch:  
   ```bash
   git push origin feature-name
   ```
4. Open a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Contact

For questions or support, reach out to:  
- **Ashmit Jagtap**  
  [GitHub](https://github.com/ashmit-coder) | [LinkedIn](https://linkedin.com/in/ashmit-jagtap)

---

 **Empower smarter hiring with Interview.io!**

