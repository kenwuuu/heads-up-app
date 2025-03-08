import os


# Function to process a file and extract words
def process_file(file_path):
    words = []
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if line and not line.startswith(('-', '=', '#')):
                words.append(line)
    return words


# Function to generate the TSX content
def generate_tsx_content(deck_id, title, description, words):
    tsx_content = "import { Deck, Word } from './interfaces';\n\n"
    tsx_content += f"const deck: Deck = {{\n"
    tsx_content += f"  id: '{deck_id}',\n"
    tsx_content += f"  title: '{title}',\n"
    tsx_content += f"  description: '{description}',\n"
    tsx_content += f"  words: [\n"

    for i, word in enumerate(words):
        tsx_content += f"    {{ id: 'word{i + 1}', text: '{word}' }},\n"

    tsx_content += f"  ],\n"
    tsx_content += f"}};\n\n"
    tsx_content += f"export default deck;\n"

    return tsx_content


# Main function to process all files in the 'raw' directory
def process_directory(directory):
    if not os.path.exists(directory):
        print(f"Directory '{directory}' does not exist.")
        return

    output_dir = "big_mocks"
    os.makedirs(output_dir, exist_ok=True)

    for filename in os.listdir(directory):
        if filename.endswith(".txt"):
            file_path = os.path.join(directory, filename)
            words = process_file(file_path)

            deck_id = filename.replace(".txt", "")
            title = deck_id.capitalize()
            description = f"A deck containing words related to {title}."

            tsx_content = generate_tsx_content(deck_id, title, description, words)

            output_file_path = os.path.join(output_dir, f"{deck_id}.tsx")
            with open(output_file_path, 'w', encoding='utf-8') as output_file:
                output_file.write(tsx_content)

            print(f"Processed {filename} and saved to {output_file_path}")


# Run the script
process_directory('raw/codenames')
