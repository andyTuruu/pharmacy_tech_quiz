import json
import random

# Load the JSON file
with open('questions.json', 'r', encoding='utf-8') as infile:
    data = json.load(infile)

# Define the categories to process
categories = ['easy-questions', 'medium-questions', 'hard-questions']

# For each category, enforce equal distribution of correctOption indices
for category in categories:
    questions = data.get(category, [])
    num_questions = len(questions)
    if num_questions == 0:
        continue

    # Calculate group size (assumes total questions is evenly divisible by 4)
    group_size = num_questions // 4

    # Create a list of target indices for correct answers: first group gets 0, second 1, etc.
    targets = [i // group_size for i in range(num_questions)]
    # Shuffle the questions to remove any ordering bias before reassigning targets
    random.shuffle(questions)
    
    # Now, for each question, reassign options so that the correct answer lands at the target index
    for idx, question in enumerate(questions):
        target = targets[idx]
        # Get the correct answer text (as defined originally)
        correct_answer = question['options'][question['correctOption']]
        # Remove the correct answer from the options list
        other_options = [opt for opt in question['options'] if opt != correct_answer]
        # Shuffle the other options for randomness
        random.shuffle(other_options)
        # Insert the correct answer at the desired target index
        new_options = other_options.copy()
        new_options.insert(target, correct_answer)
        # Update the question with new options and target correctOption
        question['options'] = new_options
        question['correctOption'] = target

    # Put back the shuffled questions into the category
    data[category] = questions

# Write the updated JSON data to a new file
with open('questions_shuffled_balanced.json', 'w', encoding='utf-8') as outfile:
    json.dump(data, outfile, indent=2)

print("Balanced shuffled JSON file has been saved as 'questions_shuffled_balanced.json'.")
