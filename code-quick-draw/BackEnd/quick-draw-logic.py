import random
import json

def load_questions(filename):
    with open(filename, 'r') as file:
        return json.load(file)

def main():
    # Load questions from the JSON file
    questions = load_questions('Q&A.json')

    # Randomly select a question
    selected_question = random.choice(questions)

    # Print the selected question as a JSON string
    print(json.dumps(selected_question))

if __name__ == "__main__":
    main()
