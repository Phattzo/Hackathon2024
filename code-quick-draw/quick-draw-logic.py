import random
import time
import json

def load_questions(filename):
    with open(filename, 'r') as file:
        return json.load(file)

def main():
    # Load questions from the JSON file
    questions = load_questions('Q&A.json')

    # Randomly select a question
    selected_question = random.choice(questions)
    expected_code = selected_question["answer"]
    
    # Display the question to the user
    print(f"Complete the following code to output '{expected_code}':\n")
    print(selected_question["question"])

    # Start the timer
    start_time = time.time()
    
    # Read user input
    print("\nEnter your completed code (finish input with an empty line):")
    user_code_lines = []
    
    while True:
        line = input()
        if line.strip() == "":
            break
        user_code_lines.append(line)
    
    user_code = "\n".join(user_code_lines)
    
    # Stop the timer
    end_time = time.time()
    
    # Calculate the elapsed time
    elapsed_time = end_time - start_time
    
    # Check if the user's code matches the expected code
    if user_code.strip() == expected_code.strip():
        print("\nCorrect code!")
    else:
        print("\nIncorrect code. Here's the correct code:\n")
        print(expected_code)
    
    # Display the time taken
    print(f"\nTime taken: {elapsed_time:.2f} seconds")

if __name__ == "__main__":
    main()
