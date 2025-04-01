"use client";

import styled from "styled-components";

export const Section1 = styled.section`
  background-image: url("/images/ae3dc66705e6e9f48b0b6397b95fb991.jpeg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;

  #vote {
    background: rgba(15, 172, 255, 0.65);
  }
`;

export const Section4 = styled.section`
  border-bottom: 1px solid #0000001a;

  li {
    border: 1px solid #0000001a;
  }
`;

export const Section2 = styled.section`
  border-bottom: 1px solid #0000001a;

  .vote-card {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px;
  }

  .admin-box {
    border: 0.5px solid #0000001a;
  }
`;

export const Section3 = styled.section`
  border-top: 1px solid #0000001a;
  border-bottom: 1px solid #0000001a;

  .vote-button {
    background: rgba(15, 172, 255, 0.65);
  }

  .vote-card {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
`;
