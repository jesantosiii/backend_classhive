import React, { useState, useEffect } from "react";
import Sidebar from "@/components/ui/sidebarupdated";
import { TopBar } from "@/components/ui/topbar";
import { PeopleList } from "../Components/people";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getTokens } from "../../../config.ts";

const ClassroomPeople: React.FC = () => {
    const { classCode } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
    const fetchPeople = async () => {
        try {
            const tokens = getTokens();
            if (!tokens || !tokens.access) {
                throw new Error("Authentication token is missing. Please log in again.");
            }

            const response = await axios.get(
                `http://127.0.0.1:8000/teachers/classrooms/${classCode}/people/`,
                { headers: { Authorization: `Bearer ${tokens.access}` } }
            );

            const people = response.data.people;

            // Combine first_name and last_name into a single name property
            const teacher = people
                .filter((person) => person.role === "Teacher")
                .map((person) => ({
                    ...person,
                    name: `${person.first_name} ${person.last_name}`,
                }))[0]; // Get the first teacher (if any)

            const students = people
                .filter((person) => person.role === "Student")
                .map((person) => ({
                    ...person,
                    name: `${person.first_name} ${person.last_name}`,
                }));

            console.log("Teacher:", teacher);
            console.log("Students:", students);

            setTeacher(teacher || null); // Default null if not found
            setStudents(students || []); // Default empty array if no students
        } catch (error: any) {
            setErrorMessage(
                error.response?.data?.detail || "Failed to fetch people data."
            );
        } finally {
            setLoading(false);
        }
    };

    fetchPeople();
}, [classCode]);



    if (loading) return <div>Loading people data...</div>;
    if (errorMessage) return <div>Error: {errorMessage}</div>;

    return (
        <div className="min-h-screen flex bg-white relative">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-[270px]">
                <TopBar />
                <main className="relative flex-1 p-6 bg-gray-50">
                    {teacher && students.length > 0 ? (
                        <PeopleList teacher={teacher} students={students} />
                    ) : (
                        <div>No teacher or students available.</div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ClassroomPeople;
