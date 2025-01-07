"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Category } from "@prisma/client";

export default function Grid({ data }: { data: Category[] }) {
  return (
    <div className="lg:columns-3 md:columns-2  overflow-hidden  px-5 pb-5">
      {data.map((project, index) => {
        return (
          <motion.article
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut" }}
            viewport={{ once: false }}
            className={` relative pb-4 `}
          >
            <div className="max-w-sm h-64 max-h-96">
              <Image
                src={project?.image ?? "/images/not-found.png"}
                alt={"image"}
                height={600}
                width={1200}
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute bottom-2 text-black w-full p-4 flex justify-center items-center">
              <h3 className="sm:text-xl text-sm bg-black text-white rounded-xl p-2 px-4">
                {project.title}
              </h3>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
