
import { AssessmentQuestion, UserLevel } from './types.ts';
import { StarIcon, BookOpenIcon, BeakerIcon, CodeBracketIcon, BuildingLibraryIcon, PaintBrushIcon, UsersIcon, PuzzlePieceIcon } from './components/icons.tsx';

export const ASSESSMENT_QUESTIONS: Record<UserLevel, AssessmentQuestion[]> = {
  Primary: [
    {
      id: 'interests',
      type: 'icon-select',
      questionText: 'What do you love to do?',
      options: [
        { label: 'Drawing', value: 'drawing', icon: PaintBrushIcon },
        { label: 'Reading Stories', value: 'stories', icon: BookOpenIcon },
        { label: 'Building Things', value: 'building', icon: PuzzlePieceIcon },
        { label: 'Playing with Friends', value: 'friends', icon: UsersIcon },
        { label: 'Science Fun', value: 'science', icon: BeakerIcon },
      ],
    },
    {
      id: 'play_types',
      type: 'multiple-choice',
      questionText: 'Which game sounds most fun?',
      options: [
        { label: 'Solving a tricky puzzle', value: 'puzzles' },
        { label: 'Pretending to be a superhero', value: 'roleplay' },
        { label: 'Building the tallest tower ever', value: 'construction' },
      ],
    },
    {
      id: 'solve_problems',
      type: 'multiple-choice',
      questionText: 'What sounds more fun to create?',
      options: [
        { label: 'A robot that helps with chores', value: 'build_robot' },
        { label: 'A beautiful painting', value: 'paint_picture' },
        { label: 'An exciting adventure story', value: 'write_story' },
      ],
    },
  ],
  Primary_CBC: [
    {
      id: 'cbc_activity',
      type: 'multiple-choice',
      questionText: 'Which activity would you pick for a fun afternoon?',
      options: [
        { label: 'Build a tower with blocks and see how high it goes', value: 'build_tower' },
        { label: 'Tell a short story about a day at the market', value: 'tell_story' },
        { label: 'Solve a fun picture puzzle', value: 'solve_puzzle' },
      ],
    },
    {
      id: 'cbc_curiosity',
      type: 'multiple-choice',
      questionText: '(For Parent/Teacher) How often does the child ask how toys or gadgets work?',
      options: [
        { label: 'Often', value: 'often' },
        { label: 'Sometimes', value: 'sometimes' },
        { label: 'Rarely', value: 'rarely' },
      ],
    },
    {
      id: 'cbc_digital',
      type: 'multiple-choice',
      questionText: '(For Parent/Teacher) Can the child use a tablet to draw or follow a video?',
      options: [
        { label: 'Yes, easily', value: 'yes' },
        { label: 'With some help', value: 'with_help' },
        { label: 'Not yet', value: 'no' },
      ],
    },
  ],
  HighSchool: [
    {
      id: 'post_hs_plans',
      type: 'multiple-choice',
      questionText: 'What are your plans after high school?',
      options: [
        { label: 'I have a specific career or course in mind', value: 'specific_plan' },
        { label: 'I have some ideas but I\'m not sure', value: 'some_ideas' },
        { label: 'I\'m not sure at all, I\'d like to explore options', value: 'explore' },
      ],
    },
    {
      id: 'favorite_subject',
      type: 'multiple-choice',
      questionText: 'Which subject are you strongest in?',
      options: [
        { label: 'Biology / Chemistry', value: 'science' },
        { label: 'Math / Physics', value: 'math' },
        { label: 'History / Literature', value: 'humanities' },
        { label: 'Art / Music', value: 'arts' },
        { label: 'Computer Studies / ICT', value: 'tech' },
      ],
    },
    {
      id: 'problem_solving_style',
      type: 'multiple-choice',
      questionText: 'When faced with a difficult problem, you prefer to:',
      options: [
        { label: 'Analyze data and find a logical solution', value: 'analytical' },
        { label: 'Brainstorm creative and unconventional ideas', value: 'creative' },
        { label: 'Build or create a hands-on solution', value: 'hands_on' },
      ],
    },
    {
      id: 'work_environment',
      type: 'multiple-choice',
      questionText: 'What work environment sounds best to you?',
      options: [
        { label: 'A busy office or collaborative space', value: 'office' },
        { label: 'A laboratory or research facility', value: 'lab' },
        { label: 'Outdoors, working with nature or in the field', value: 'outdoors' },
        { label: 'A flexible/remote environment', value: 'remote' },
      ],
    },
    {
      id: 'ambition',
      type: 'multiple-choice',
      questionText: 'What is your biggest ambition for your career?',
      options: [
        { label: 'To have a stable and secure job', value: 'stability' },
        { label: 'To become an expert in a specific field', value: 'expertise' },
        { label: 'To lead a team or a company', value: 'leadership' },
        { label: 'To create something new or start my own business', value: 'entrepreneurship' },
      ],
    },
    {
      id: 'africa_challenges',
      type: 'multiple-choice',
      questionText: 'Which challenge in Africa are you most interested in solving?',
      options: [
        { label: 'Improving healthcare with technology', value: 'healthtech' },
        { label: 'Creating better access to education', value: 'edutech' },
        { label: 'Developing sustainable energy solutions', value: 'energy' },
        { label: 'Innovating in finance and business', value: 'fintech' },
      ],
    },
  ],
  University: [
    {
      id: 'major',
      type: 'text',
      questionText: 'What is your major or field of study?',
    },
    {
      id: 'project_type',
      type: 'multiple-choice',
      questionText: 'What kind of project excites you most?',
      options: [
        { label: 'Building a complex software application', value: 'software' },
        { label: 'Analyzing data to find hidden patterns', value: 'data' },
        { label: 'Designing a user-friendly product', value: 'design' },
        { label: 'Conducting research and writing a paper', value: 'research' },
      ],
    },
    {
      id: 'stem_application',
      type: 'multiple-choice',
      questionText: 'How do you see your studies contributing to STEM in Africa?',
      options: [
        { label: 'Building local tech solutions for local problems', value: 'local_solutions' },
        { label: 'Conducting research on regional issues', value: 'research' },
        { label: 'Mentoring future STEM students', value: 'mentoring' },
      ],
    },
  ],
  Adult: [
    {
      id: 'current_role',
      type: 'text',
      questionText: 'What is your current or most recent job title?',
    },
    {
      id: 'skills',
      type: 'text',
      questionText: 'List 2-3 of your strongest professional skills (e.g., customer service, project management).',
    },
    {
      id: 'tech_reskill',
      type: 'multiple-choice',
      questionText: 'Are you interested in a tech-focused role that addresses African market needs?',
      options: [
        { label: 'Yes, especially in areas like Fintech or HealthTech', value: 'yes_fintech' },
        { label: 'Yes, in a more general software/data role', value: 'yes_general' },
        { label: 'No, I prefer non-tech roles', value: 'no' },
      ],
    },
  ],
};
