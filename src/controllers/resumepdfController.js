const axios=require("axios");
const fs=require("fs");
const pdfMake=require("pdfmake/build/pdfmake.js")
const pdfFonts=require("pdfmake/build/vfs_fonts.js");


pdfMake.addVirtualFileSystem(pdfFonts);
const generateResumePdf=async(req,res)=>{
  try{
    const formatDateRange = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
    
      const startMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(start);
      const startYear = start.getFullYear();
    
      const endMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(end);
      const endYear = end.getFullYear();
    
      return `${startMonth} ${startYear} – ${endMonth} ${endYear}`;
    };
    const userId=req.params.userId;
    let userData;
    try {
      const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
      userData = userResponse.data;
    } catch (err) {
      return res.status(404).json({ message: "User not found." });
    }
    const educationResponse=await axios.get(`http://localhost:5000/api/education/${userId}`)
    const educationData=[educationResponse.data]
    const projectResponse=await axios.get(`http://localhost:5000/api/projects/${userId}`)
    const projectData=[projectResponse.data]
    if(!userData){
      return res.status(404).json({message:"user not found"})
    }
    if(educationData.length==0){
      return res.status(404).json({message:"Education Details  not found"})
    }
    const { fullName, email, phone, linkedin, gitHub } = userData;
    const docDefinition={
      content:[
        {
          text: `${fullName}`,
          style: 'header',
        },
        {
          text: `${phone}| ${email} |${linkedin}|${gitHub}`,
          style: 'subheader',
        },
        { text: '\n' },
        {
          stack: [
            { text: 'Objective', style: 'sectionHeader' },
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }], margin: [0, -5, 0, 10] },
          ],
        },
        {
          margin: [0, 1, 0, 15],
          text: 'As a dedicated and detail-oriented software professional with expertise in artificial intelligence, data science, and full-stack development, my objective is to leverage my technical and problem-solving skills to contribute to innovative projects. I aim to deliver scalable and efficient solutions by blending advanced technologies with practical applications. Having gained substantial experience in end-to-end project development, data warehousing, and real-time communication platforms, I am committed to learning and adapting to the latest trends in technology. My strong foundation in machine learning, natural language processing, and software engineering enables me to excel in collaborative and research-driven environments. I am eager to take on challenging opportunities that push the boundaries of technology while driving impactful outcomes for businesses and society.',
          style: 'bulletText',
        },
    
        {
          stack:[
            {text:"Education",style:"sectionHeader"},
            {canvas:[{
                type:"line",
                x1:0,
                y1:0,
                x2:515,
                y2:0,
                lineWidth:1}], margin:[0,-5,0,1]},
            ],
            
          },
          {
            margin:[0,1,0,15],
            table:{
              widths:["70%","30%"],
              body:educationData.map((edu)=>[
                [
                {
                  text:edu.institution || "N/A",
                  style:"boldText"
                },
                {
                  text:edu.location || "N/A",
                  style:"rightAlign",
                }
              ],
              [
                {
                  text:edu.degree || "N/A",
                  style:"italicText"
                },
                {
                  text: edu.startDate && edu.endDate ? formatDateRange(edu.startDate, edu.endDate) : "N/A",
                  style: "rightAlign",
                }
              ],
              [
                {
                  ul: [
                    { text: `Cumulative GPA: ${edu.gpa || "N/A"}`, style: 'bulletText' },
                    {
                      text: `Relevant Coursework: ${edu.coursework?.join(', ') || 'N/A'}`,
                      style: 'bulletText',
                    },
                  ],
                  colSpan: 2,
                },
                {},

              ]
            ]).flat(),
            },
            layout:"noBorders"

          },
          { text: '\n' },
          {
            stack: [
              { text: 'Projects', style: 'sectionHeader' },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 0,
                    x2: 515,
                    y2: 0,
                    lineWidth: 1,
                  },
                ],
                margin: [0, -5, 0, 10],
              },
            ],
          },
          {
            margin: [0, 1, 0, 15],
            table: {
              widths: ['70%', '30%'],
              body: projectData.map((project) => [
                [
                  {
                    text: project.projectName || 'N/A',
                    style: 'boldText',
                  },
                  {
                    text: new Date(project.projectDate).toLocaleDateString() || 'N/A',
                    style: 'rightAlign',
                  },
                ],
                [
                  {
                    ul: [
                      { text: `Description: ${project.description || 'N/A'}`, style: 'bulletText' },
                      { text: `Technologies Used: ${project.technologyUsed || 'N/A'}`, style: 'bulletText' },
                      { text: `Link: ${project.link || 'N/A'}`, style: 'bulletText' },
                    ],
                    colSpan: 2,
                  },
                  {}, 
                ],
              ]).flat(),
            },
            layout: 'noBorders',
          },
          
          { text: '\n' },
          
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 10,
          alignment: 'center',
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 5],
        },
        boldText: {
          fontSize: 12,
          bold: true,
        },
        italicText: {
          fontSize: 11,
          italics: true,
        },
        bulletText: {
          fontSize: 10,
          margin: [0, 2, 0, 2],
        },
        rightAlign: {
          alignment: 'right',
          fontSize: 10,
        },
      },

    }
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.getBuffer((buffer) => {
      const resumePath = `./resumes/${fullName}_Resume.pdf`;
  
      
      if (!fs.existsSync('./resumes')) {
        fs.mkdirSync('./resumes');
      }
  
      fs.writeFileSync(resumePath, buffer);
      res.status(200).send(`PDF generated and saved at ${resumePath}`);
    });
  }catch(error){
   
    res.status(500).json({ error: 'An error occurred while generating the resume.' });
  }
}
module.exports = { generateResumePdf };
