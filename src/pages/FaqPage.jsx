import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Heading, Text } from '@chakra-ui/react';
import Base from "../components/Base";

export const FaqPage = () => {

  return (
      <Base>
        <Box p={6}>
          <Heading as="h1"  mb={4}>
            Frequently Asked Questions
          </Heading>

          <Accordion allowToggle size="lg" >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" color="pink.400" fontWeight="bold">
                    1. How do I earn points on Leetcode Points?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} >
                To earn points, simply solve question on Leetcode and then enter the Leetcode problem ID on our website.
                <br/>We will be award you points based on the difficulty of the problem:
                <ul>
                  <li>Easy problems: 100 points</li>
                  <li>Medium problems: 300 points</li>
                  <li>Hard problems: 600 points</li>
                </ul>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" color="pink.400" fontWeight="bold">
                    2. How can I track my progress?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} >
                We provide a progress tracking feature on our website.
                <br/>Once you solve a problem and earn points, your progress will be automatically updated.
                <br/>You can view your total points, completed problems, and track your performance
                over time.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" color="pink.400" fontWeight="bold">
                    3. Can I compete with other users on the platform?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} >
                Coming Soon
                {/*Absolutely! We have a leaderboard where you can compare your points and progress with other users. Compete for*/}
                {/*the top spot and see how you rank among fellow Leetcode solvers.*/}
              </AccordionPanel>
            </AccordionItem>

            {/* Add more FAQ items as needed */}
          </Accordion>
        </Box>
      </Base>

  );
};
