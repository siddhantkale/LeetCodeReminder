"""
    To get your solved problems from leetcode use this script replacing the suitable parts.
    Import selenium and have chrome driver installed and then set up mongodb atlas and run fill_database.js
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import json
import time


def fetch_solved_problems(username, password):
    driver = webdriver.Chrome()  # Make sure to have ChromeDriver installed
    driver.get('https://leetcode.com/accounts/login/')

    # Log in to leetcode
    driver.find_element(By.ID, 'id_login').send_keys(username)
    driver.find_element(By.ID, 'id_password').send_keys(password)
    driver.find_element(By.ID, 'id_password').send_keys(Keys.RETURN)

    time.sleep(5)  # Wait for login to complete
    solved_problems = set() #store only unique solved problems

    # submission's url
    url = f'https://leetcode.com/submissions/#/'
    i = 1
    while True:
        #go to next page of submission
        driver.get(url + f'{i}')
        time.sleep(5)

        #check if submissions are present
        if(driver.find_elements(By.XPATH,"//*[@id='submission-list-app']/div/table/tbody/tr[5]") == []):
            break

        #get all accepted submissions
        rows = driver.find_elements(By.XPATH, "//tr[td[3]/a/strong[text()='Accepted']]")
        for row in rows:
            # Extract problem title and URL
            problem_element = row.find_element(By.XPATH, ".//td[2]/a")
            problem_title = problem_element.text
            problem_url = problem_element.get_attribute("href")

            # Append to the list
            solved_problems.add((problem_title, problem_url))
        i+=1
    driver.quit()
    return solved_problems


# enter your credentials for your use
username = 'your leetcode username'
password = 'your leetcode password'

#convert set to list for json operations
solved_problems = list(fetch_solved_problems(username, password))

#create a new file named solved_problems to have all solved problems
with open('solved_problems.json', 'w') as file:
    json.dump(solved_problems, file, indent=4)


