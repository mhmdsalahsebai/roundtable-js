// Import core survey components
import Survey from '../core/survey.js';
import Page from '../core/page.js';
import MultipleChoice from '../question_types/multipleChoice.js';
import Grid from '../question_types/grid.js';

// Create and initialize a new survey
const survey = new Survey('beverageSurvey', 'Comprehensive Beverage Consumption Survey');

// Constructs and populates pages with appropriate survey questions and logic
function constructSurveyPages() {
    const surveyPages = [];
    const surveyQuestions = [
        {
            id: 'q1a',
            text: 'On what occasions, or for what purposes do you regularly use beverages?',
            options: [
                'In the morning',
                'With meals',
                'As a snack',
                'With desserts',
                'As a refreshing drink',
                'As a health supplement'
            ]
        },
        {
            id: 'q1b',
            text: 'How often do you use beverages for the following purposes?',
            grid: true,
            rows: (data) => Array.isArray(data['q1a']) ? data['q1a'] : [],
            columns: [
                'Everyday',
                'Four or five times a week',
                'Two or three times a week',
                'Once a week',
                'Three times a month',
                'Twice a month',
                'Once a month',
                'Less Often'
            ]
        }
    ];

    surveyQuestions.forEach((question, index) => {
        const page = new Page(`page${index + 1}`, data => 
            index === 0 || (data[surveyQuestions[index - 1].id] && data[surveyQuestions[index - 1].id].length > 0)
        );
        if (question.grid) {
            page.addElement(new Grid(question.id, question.text, question.rows, question.columns, true));
        } else {
            page.addElement(new MultipleChoice(question.id, question.text, question.options));
        }
        surveyPages.push(page);
    });

    return surveyPages;
}

// Add constructed pages to the survey
const initialPages = constructSurveyPages();
initialPages.forEach(page => survey.addPage(page));

// Override submitData to handle logic after data is received
const originalSubmitData = survey.submitData.bind(survey);
survey.submitData = (data) => {
    console.log(data);
    const updatedPage = originalSubmitData(data);
    return updatedPage;
};

// Export the configured survey
export default survey;