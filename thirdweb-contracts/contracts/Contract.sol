// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Add course
// Get courses
// Purchase course
// Get trending course
// Optional - search course
// get number of students per instructor ✅

// Bug: Once already purchased he can again purchase
// Fix: Give Purchase | Already purchased option.
contract Agora {
    struct Course {
        address owner;
        string title;
        string description;
        address[] consumers;
        uint256 price;
        string image;
        uint256 createdOn;
        string createdBy;
        string level;
        string category;
        string language;
        bool certificate;
    }
    struct Instructor {
        address addressOfInstructor;
        address[] students;
    }
    event Log(string message);
    event Log(address id);
    // event Log(address indexed indexedtype);
    mapping(uint256 => Course) public courses;
    // mapping(uint256 => address) public instructors;

    mapping(uint256 => Instructor) public instructors;
    mapping(uint256 => address) public students;

    uint256 public numberOfCourses = 0;
    uint256 public numberOfInstructors = 0;
    uint256 public numberOfStudents = 0;

    function createCourse(
        address _owner,
        string memory _title
    ) public returns (uint256) {
        Course storage course = courses[numberOfCourses];
        Instructor storage instructor = instructors[numberOfInstructors];
        course.owner = _owner;
        course.title = _title;

        numberOfCourses++;
        bool alreadyInstructor = false;

        emit Log(_owner);
        for (uint256 i = 0; i < numberOfInstructors; i++) {
            emit Log("Inside loop instructor:");

            if (instructors[i].addressOfInstructor == _owner) {
                emit Log("Instructor is already present");
                alreadyInstructor = true;
                break;
            }
        }
        if (!alreadyInstructor) {
            instructor.addressOfInstructor = _owner;
            numberOfInstructors++;
        }

        return numberOfCourses - 1;
    }

    function purchaseCourse(uint256 _id) public payable {
        bool alreadyStudent = false;
        for (uint256 i = 0; i < numberOfStudents; i++) {
            if (msg.sender == students[i]) {
                emit Log("Student is already present");
                alreadyStudent = true;
                break;
            }
        }
        if (!alreadyStudent) {
            students[numberOfStudents] = msg.sender;
            numberOfStudents++;
        }

        uint256 amount = msg.value;

        Course storage course = courses[_id];

        course.consumers.push(msg.sender);

        (bool sent, ) = payable(course.owner).call{value: amount}("");

        uint256 id;
        for (uint256 i = 0; i < numberOfInstructors; i++) {
            if (instructors[i].addressOfInstructor == courses[_id].owner) {
                id = i;
            }
        }
        address[] memory studentsOfInstructor = getStudentsByInstructor(id);
        alreadyStudent = false;
        for (uint256 i = 0; i < studentsOfInstructor.length; i++) {
            if (studentsOfInstructor[i] == msg.sender) {
                alreadyStudent = true;
                break;
            }
        }
        if (!alreadyStudent) {
            instructors[id].students.push(msg.sender);
        }
    }

    function getCourses() public view returns (Course[] memory) {
        Course[] memory allCourses = new Course[](numberOfCourses);

        for (uint256 i = 0; i < numberOfCourses; i++) {
            Course storage item = courses[i];
            allCourses[i] = item;
        }
        return allCourses;
    }

    function getStudents() public view returns (address[] memory) {
        address[] memory allStudents = new address[](numberOfStudents);

        for (uint256 i = 0; i < numberOfStudents; i++) {
            address item = students[i];
            allStudents[i] = item;
        }
        return allStudents;
    }

    function getInstructors() public view returns (Instructor[] memory) {
        Instructor[] memory allInstructors = new Instructor[](
            numberOfInstructors
        );

        for (uint256 i = 0; i < numberOfInstructors; i++) {
            Instructor storage item = instructors[i];
            allInstructors[i] = item;
        }
        return allInstructors;
    }

    function getStudentsByCourse(
        uint256 _id
    ) public view returns (address[] memory) {
        return (courses[_id].consumers);
    }

    function getStudentsByInstructor(
        uint256 _id
    ) public view returns (address[] memory) {
        return (instructors[_id].students);
    }

    function getTrendingCourses() public view returns (Course[] memory) {
        Course[] memory courseList = getCourses();

        for (uint256 i = 0; i < numberOfCourses; i++)
            for (uint256 j = 0; j < i; j++)
                if (
                    courseList[i].consumers.length >
                    courseList[j].consumers.length
                ) {
                    Course memory course = courseList[i];
                    courseList[i] = courseList[j];
                    courseList[j] = course;
                }

        return courseList;
    }
}
