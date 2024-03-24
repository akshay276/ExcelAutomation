def extract_job_machine_pairs(jil_file):
    job_machine_pairs = []

    with open(jil_file, 'r') as file:
        lines = file.readlines()

    prev_insert_job = None

    for line in lines:
        line = line.strip()
        if line.startswith("insert_job:"):
            prev_insert_job = line[len("insert_job:"):].strip()
        elif line.startswith("machine:") and prev_insert_job:
            machine_name = line[len("machine:"):].strip()
            job_machine_pairs.append((prev_insert_job, machine_name))
            prev_insert_job = None

    return job_machine_pairs

def main():
    jil_file = "example.jil"
    job_machine_pairs = extract_job_machine_pairs(jil_file)

    for job, machine in job_machine_pairs:
        print("Insert_job:", job)
        print("Machine:", machine)

if __name__ == "__main__":
    main()











#second way is below:


def extract_job_machine_pairs(jil_file):
    job_machine_pairs = []

    with open(jil_file, 'r') as file:
        lines = file.readlines()

    prev_insert_job = None

    for line in lines:
        line = line.strip()
        if line.startswith("insert_job:"):
            prev_insert_job = line[len("insert_job:"):].strip()
        elif line.startswith("machine:"):
            machine_name = line[len("machine:"):].strip()
            if prev_insert_job:
                job_machine_pairs.append((prev_insert_job, machine_name))
                prev_insert_job = None

    return job_machine_pairs

def main():
    jil_file = "example.jil"
    job_machine_pairs = extract_job_machine_pairs(jil_file)

    for job, machine in job_machine_pairs:
        print("Insert_job:", job)
        print("Machine:", machine)

if __name__ == "__main__":
    main()

